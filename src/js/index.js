import {
  getSpots,
  getSpotForecast,
  getWaterTemp,
  getWindSpeed
} from './requests';

import { createWindSpeedChart, createWaveHeightChart } from './charts';
import { getAMPMHours } from './utilities';
import '../sass/styles.scss';

const addSpots = async () => {
  const spots = await getSpots();
  const availableSpotsText = document.querySelector('.available-spots__text');
  availableSpotsText.textContent = spots.join(' · ');
};

const addWaterTemp = async () => {
  const waterTemp = await getWaterTemp();
  const waterTempEl = document.querySelector('.water-temp__text');
  waterTempEl.innerHTML = `Water temperature: <b class="water-temp__highlight">${waterTemp.fahrenheit}°F / ${waterTemp.celcius}°C</b> <br>Recommended <b class="water-temp__highlight">${waterTemp.wetsuit}</b>`;
};

const addWindSpeed = async () => {
  const windSpeed = await getWindSpeed();
  const windSpeedEl = document.querySelector('.wind-speed__text');

  const currentHour = getAMPMHours(new Date());
  const currentWindSpeed = windSpeed.find(item => {
    return parseInt(item.hour.replace(/[A-Z]/gi, '')) === currentHour;
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

const addSpotForecast = async spotId => {
  const spotForecast = await getSpotForecast(spotId);
  const spotName = spotForecast[0].spot_name;
  const spotNameEl = document.createElement('h3');
  const currentDate = spotForecast[0].date;
  const currentDateEl = document.querySelector('#current-date');

  spotNameEl.textContent = spotName;
  currentDateEl.textContent = currentDate;

  createWaveHeightChart(spotForecast, spotNameEl);
};

addSpots();
addWaterTemp();
addWindSpeed();
addSpotForecast(161);
addSpotForecast(154);
addSpotForecast(152);
