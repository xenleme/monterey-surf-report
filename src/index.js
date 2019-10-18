import { getSpots, getSpotForecast } from './requests';
import Chart from 'chart.js';

const addSpots = async () => {
  const spots = await getSpots();
  const availableSpots = document.querySelector('#available-spots');
  availableSpots.textContent = spots.join(', ');
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
addSpotForecast(161);
addSpotForecast(154);
addSpotForecast(152);
