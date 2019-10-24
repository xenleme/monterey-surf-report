// Convert datetime in 12 hour AM/PM format
const getAMPMHours = date => {
  let hours = date.getHours();
  hours = hours % 12;
  hours = hours ? hours : 12;
  return hours;
};

export { getAMPMHours };
