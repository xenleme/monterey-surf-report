// Convert datetime in 12 hour AM/PM format
const getAMPMHours = date => {
  let hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return hours + ampm;
};

const errorText = (error, element, text) => {
  element.textContent = `${error.message} ${text} - Something is wrong with connection to the API`;

  if (element.id === 'spots') {
    element.style.color = 'black';
    element.style.fontSize = '2.5rem';
    element.style.fontWeight = 'bold';
  } else {
    element.style.color = 'red';
  }
};

export { getAMPMHours, errorText };
