import {
  getSpots,
  getSpotForecast,
  getWaterTemp,
  getWindSpeed
} from './requests';

import { createWindSpeedChart, createWaveHeightChart } from './charts';

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

  const currentHour = new Date().getHours();
  const currentWindSpeed = windSpeed.find(item => {
    return item.hour.replace(/[A-Z]/gi, '') === currentHour.toString();
  });

  windSpeedEl.textContent = `Wind speed at ${
    currentWindSpeed.hour
  }: ${parseFloat(currentWindSpeed.speed_mph.toFixed(1))} mph from ${
    currentWindSpeed.direction_text
  }`;

  createWindSpeedChart(windSpeed);
};

const addSpotForecast = async spotId => {
  const spotForecast = await getSpotForecast(spotId);
  const spotName = spotForecast[0].spot_name;
  const spotNameEl = document.createElement('h3');

  spotNameEl.textContent = spotName;

  createWaveHeightChart(spotForecast, spotNameEl);
};

addSpots();
addWaterTemp();
addWindSpeed();
addSpotForecast(161);
addSpotForecast(154);
addSpotForecast(152);
