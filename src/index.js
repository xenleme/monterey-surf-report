import {
  getSpots,
  getSpotForecast,
  getWaterTemp,
  getWindSpeed
} from './requests';
import Chart from 'chart.js';

const addSpots = async () => {
  const spots = await getSpots();
  const availableSpots = document.querySelector('#available-spots');
  availableSpots.textContent = spots.join(', ');
};

const addWaterTemp = async () => {
  const waterTemp = await getWaterTemp();
  const waterTempEl = document.querySelector('#water-temp');
  waterTempEl.textContent = `Water temperature: ${waterTemp.fahrenheit}°F / ${waterTemp.celcius}°C`;
};

const addWindSpeed = async () => {
  const windSpeed = await getWindSpeed();
  const windSpeedEl = document.querySelector('#wind-speed');
  const windSpeedMph = windSpeed.map(item => item.speed_mph);
  const sum = windSpeedMph.reduce((previous, current) => (current += previous));
  const avgWindSpeedMph = Math.round(sum / windSpeedMph.length);
  windSpeedEl.textContent = `Wind speed: ${avgWindSpeedMph} mph`;
};

const addSpotForecast = async spotId => {
  const spotForecast = await getSpotForecast(spotId);
  const spotName = spotForecast[0].spot_name;
  const spotNameEl = document.createElement('h3');

  spotNameEl.textContent = spotName;

  createWaveHeightChart(spotForecast, spotNameEl);
};

const createWaveHeightChart = (spotForecast, spotNameEl) => {
  const spotsEl = document.querySelector('#spots');

  const waveObj = {
    xLabels: [],
    yValues: []
  };

  for (let i = 0; i < spotForecast.length - 1; i++) {
    waveObj.xLabels.push(spotForecast[i].hour);
    waveObj.yValues.push(parseFloat(spotForecast[i].size_ft.toFixed(2)));
  }

  const ctxWave = document.createElement('canvas');

  const waveHeightChart = new Chart(ctxWave, {
    type: 'bar',
    data: {
      labels: waveObj.xLabels,
      datasets: [
        {
          label: 'Wave Height (ft)',
          data: waveObj.yValues,
          backgroundColor: 'rgba(21, 44, 66, 0.89)',
          borderColor: 'rgba(216, 219, 222, 0.89)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  spotsEl.appendChild(spotNameEl);
  spotsEl.appendChild(ctxWave);
};

addSpots();
addWaterTemp();
addWindSpeed();
addSpotForecast(161);
addSpotForecast(154);
addSpotForecast(152);
