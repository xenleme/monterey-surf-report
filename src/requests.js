const getSpots = async () => {
  const spotsURL = 'http://api.spitcast.com/api/county/spots/monterey/';
  const response = await fetch(spotsURL);

  if (response.status === 200) {
    const data = await response.json();
    return data.map(spot => spot.spot_name);
  } else {
    throw new Error('Unable to get spots.');
  }
};

const getSpotForecast = async spotId => {
  const spotForecastURL = `http://api.spitcast.com/api/spot/forecast/${spotId}/`;
  const response = await fetch(spotForecastURL);

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Unable to get spots forecast.');
  }
};

const getWaterTemp = async () => {
  const waterTempURL =
    'http://api.spitcast.com/api/county/water-temperature/monterey/';
  const response = await fetch(waterTempURL);

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Unable to get water temperature.');
  }
};

const getWindSpeed = async () => {
  const windШndicatorsURL = 'http://api.spitcast.com/api/county/wind/monterey/';
  const response = await fetch(windШndicatorsURL);

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Unable to get wind speed.');
  }
};

export { getSpots, getSpotForecast, getWaterTemp, getWindSpeed };
