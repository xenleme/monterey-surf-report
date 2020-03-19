// Convert datetime in 12 hour AM/PM format
const getAMPMHours = date => {
  let hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return hours + ampm;
};

const errorText = (error, element) => {
  element.textContent = `${error.message} - Something wrong with concetion to API`;
  element.style.color = 'red';
};

export { getAMPMHours, errorText };
