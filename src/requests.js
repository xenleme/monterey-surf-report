const spotsURL = 'http://api.spitcast.com/api/county/spots/monterey/';

const getSpots = async () => {
  const response = await fetch(spotsURL);

  if (response.status === 200) {
    const data = await response.json();
    return data.map(spot => spot.spot_name);
  } else {
    throw new Error('Unable to get spots.');
  }
};

export default getSpots;
