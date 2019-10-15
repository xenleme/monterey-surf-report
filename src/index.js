import getSpots from './requests';

const spotsEl = document.querySelector('#spots');

const addSpots = async () => {
  const spots = await getSpots();
  spotsEl.textContent = spots.join(', ');
};

addSpots();
