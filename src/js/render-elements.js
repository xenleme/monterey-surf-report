import {
  fetchSpots,
  fetchWaterTemp,
  fetchWindSpeed,
  fetchSpotForecast
} from './requests';
import { createWindSpeedChart, createWaveHeightChart } from './charts';
import { getAMPMHours, errorText } from './utilities';

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
  const availableSpotsText = document.querySelector('.available-spots__text');
  try {
    const spots = await fetchSpots();
    availableSpotsText.textContent = spots.join(' · ');
  } catch (error) {
    errorText(error, availableSpotsText, 'avaliable spots');
  }
};

// Render water temperature indicators
const renderWaterTemp = async () => {
  const waterTempEl = document.querySelector('.water-temp__text');
  try {
    const waterTemp = await fetchWaterTemp();
    waterTempEl.innerHTML = `Water temperature: <b class="water-temp__highlight">${waterTemp.fahrenheit}°F / ${waterTemp.celcius}°C</b> <br>Recommended <b class="water-temp__highlight">${waterTemp.wetsuit}</b>`;
  } catch (error) {
    errorText(
      error,
      waterTempEl,
      'water temperature and wetsuit recommendations'
    );
  }
};

// Render  wind speed indicators
const renderWindSpeed = async () => {
  const windSpeedEl = document.querySelector('.wind-speed__text');

  try {
    const windSpeed = await fetchWindSpeed();
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
  } catch (error) {
    errorText(error, windSpeedEl, 'wind speed');
  }
};

// Render surf forecast for each available spots
const renderSpotForecast = async spotId => {
  try {
    const spotForecast = await fetchSpotForecast(spotId);
    const spotName = spotForecast[0].spot_name;
    const spotNameEl = document.createElement('h3');
    const currentDate = spotForecast[0].date;
    const currentDateEl = document.querySelector('#current-date');

    spotNameEl.textContent = spotName;
    spotNameEl.className = 'heading-secondary';
    currentDateEl.textContent = currentDate;

    createWaveHeightChart(spotForecast, spotNameEl);
  } catch (error) {
    const spotsEl = document.querySelector('#spots');
    errorText(error, spotsEl, 'avaliable charts');
  }
};

export { renderSpots, renderWaterTemp, renderWindSpeed, renderSpotForecast };
