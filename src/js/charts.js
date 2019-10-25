import Chart from 'chart.js';

const createWindSpeedChart = windSpeed => {
  const windSpeedChartEl = document.querySelector('#wind-speed-chart');

  const windSpeedObj = {
    xLabels: [],
    yValues: []
  };

  for (let i = 0; i < windSpeed.length - 1; i++) {
    windSpeedObj.xLabels.push(windSpeed[i].hour);
    windSpeedObj.yValues.push(
      `${parseFloat(windSpeed[i].speed_mph.toFixed(1))}`
    );
  }

  const ctxWindSpeed = document.createElement('canvas');

  const windSpeedChart = new Chart(ctxWindSpeed, {
    type: 'line',
    data: {
      labels: windSpeedObj.xLabels,
      datasets: [
        {
          label: 'Wind Speed (mph)',
          data: windSpeedObj.yValues,
          fill: false,
          backgroundColor: '#69acff',
          borderColor: '#69acff'
        }
      ]
    },
    options: {
      responsive: true,
      tooltips: {
        mode: 'index',
        intersect: false
      },
      scales: {
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Wind Speed'
            }
          }
        ]
      }
    }
  });

  windSpeedChartEl.appendChild(ctxWindSpeed);
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
  ctxWave.className += 'chart';

  const waveHeightChart = new Chart(ctxWave, {
    type: 'bar',
    data: {
      labels: waveObj.xLabels,
      datasets: [
        {
          label: 'Wave Height (ft)',
          data: waveObj.yValues,
          backgroundColor: 'rgba(28, 84, 138, .7)',
          hoverBackgroundColor: 'rgba(28, 84, 138, .9)',
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
            },
            scaleLabel: {
              display: true,
              labelString: 'Wave Height'
            }
          }
        ]
      }
    }
  });

  spotsEl.appendChild(spotNameEl);
  spotsEl.appendChild(ctxWave);
};

export { createWindSpeedChart, createWaveHeightChart };
