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
  const availableSpots = document.querySelector('#available-spots');
  availableSpots.textContent = spots.join(', ');
};

const addWaterTemp = async () => {
  const waterTemp = await getWaterTemp();
  const waterTempEl = document.querySelector('#water-temp');
  waterTempEl.textContent = `Water temperature: ${waterTemp.fahrenheit}°F / ${waterTemp.celcius}°C. Recommended ${waterTemp.wetsuit}.`;
};

const addWindSpeed = async () => {
  const windSpeed = await getWindSpeed();
  const windSpeedEl = document.querySelector('#wind-speed');

  const currentHour = getAMPMHours(new Date());
  const currentWindSpeed = windSpeed.find(item => {
    return parseInt(item.hour.replace(/[A-Z]/gi, '')) === currentHour;
  });

  windSpeedEl.textContent = `Wind speed at ${
    currentWindSpeed.hour
  }: ${parseFloat(currentWindSpeed.speed_mph.toFixed(1))} mph from ${
    currentWindSpeed.direction_text
  }`;

  createWindSpeedChart(windSpeed);
};

const toggleWindSpeedChart = () => {
  const windSpeedChart = document.querySelector('#wind-speed-chart');

  if (windSpeedChart.style.display === 'none') {
    windSpeedChart.style.display = 'block';
    toggleBtn.textContent = 'Hide wind speed chart';
  } else {
    windSpeedChart.style.display = 'none';
    toggleBtn.textContent = 'Show wind speed chart';
  }
};

const toggleBtn = document.getElementById('toggle-wind-speed-chart');
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
