import fetchData from './requests';
import { createWindSpeedChart, createWaveHeightChart } from './charts';
import { getAMPMHours } from './utilities';

// Page loader
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  loader.className += ' hidden';
});

// Show and hide wind speed chart by click on the button
const toggleWindSpeedChart = () => {
  const windSpeedChart = document.querySelector('#wind-speed-chart');

  if (windSpeedChart.style.display === 'none') {
    windSpeedChart.style.display = 'block';
    toggleBtn.innerHTML =
      'Hide wind speed chart <i class="fa fa-caret-up" aria-hidden="true"></i>';
  } else {
    windSpeedChart.style.display = 'none';
    toggleBtn.innerHTML =
      'Show wind speed chart <i class="fa fa-caret-down" aria-hidden="true"></i>';
  }
};

const toggleBtn = document.querySelector('.toggle-wind-speed-chart');
toggleBtn.addEventListener('click', toggleWindSpeedChart);

// Render all available spots on the location
const renderSpots = async () => {
  const spots = await fetchData(
    'http://api.spitcast.com/api/county/spots/monterey/'
  );
  const spotNames = spots.map(spot => spot.spot_name);
  const availableSpotsText = document.querySelector('.available-spots__text');
  availableSpotsText.textContent = spotNames.join(' · ');
};

// Render water temperature indicators
const renderWaterTemp = async () => {
  const waterTemp = await fetchData(
    'http://api.spitcast.com/api/county/water-temperature/monterey/'
  );
  const waterTempEl = document.querySelector('.water-temp__text');
  waterTempEl.innerHTML = `Water temperature: <b class="water-temp__highlight">${waterTemp.fahrenheit}°F / ${waterTemp.celcius}°C</b> <br>Recommended <b class="water-temp__highlight">${waterTemp.wetsuit}</b>`;
};

// Render  wind speed indicators
const renderWindSpeed = async () => {
  const windSpeed = await fetchData(
    'http://api.spitcast.com/api/county/wind/monterey/'
  );
  const windSpeedEl = document.querySelector('.wind-speed__text');

  const currentHour = getAMPMHours(new Date());
  const currentWindSpeed = windSpeed.find(item => {
    return item.hour === currentHour;
  });

  windSpeedEl.innerHTML = `Wind speed at ${
    currentWindSpeed.hour
  }: <b class="wind-speed__highlight">${parseFloat(
    currentWindSpeed.speed_mph.toFixed(1)
  )} mph</b> from <b class="wind-speed__highlight">${
    currentWindSpeed.direction_text
  }</b>`;

  createWindSpeedChart(windSpeed);
};

// Render surf forecast for each available spots
const renderSpotForecast = async spotId => {
  const spotForecast = await fetchData(
    `http://api.spitcast.com/api/spot/forecast/${spotId}/`
  );
  const spotName = spotForecast[0].spot_name;
  const spotNameEl = document.createElement('h3');
  const currentDate = spotForecast[0].date;
  const currentDateEl = document.querySelector('#current-date');

  spotNameEl.textContent = spotName;
  spotNameEl.className = 'heading-secondary';
  currentDateEl.textContent = currentDate;

  createWaveHeightChart(spotForecast, spotNameEl);
};

export { renderSpots, renderWaterTemp, renderWindSpeed, renderSpotForecast };
