const fetchData = async url => {
  const response = await fetch(url);

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Enable to get data');
  }
};

export default fetchData;
