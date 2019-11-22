const fetchSpots = async () => {
  const url = 'http://api.spitcast.com/api/county/spots/monterey/';
  const response = await fetch(url);

  if (response.status === 200) {
    const data = await response.json();
    const spotNames = data.map(spot => spot.spot_name);
    return spotNames;
  } else {
    throw new Error('Enable to get spots');
  }
};

const fetchWaterTemp = async () => {
  const url = 'http://api.spitcast.com/api/county/water-temperature/monterey/';
  const response = await fetch(url);

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Enable to get water temperature');
  }
};

const fetchWindSpeed = async () => {
  const url = 'http://api.spitcast.com/api/county/wind/monterey/';
  const response = await fetch(url);

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Enable to get wind speed');
  }
};

const fetchSpotForecast = async spotId => {
  const url = `http://api.spitcast.com/api/spot/forecast/${spotId}/`;
  const response = await fetch(url);

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Enable to get spot forecast');
  }
};

export { fetchSpots, fetchWaterTemp, fetchWindSpeed, fetchSpotForecast };
