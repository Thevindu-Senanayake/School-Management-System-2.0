const addZero = (value: number) => {
  return value < 10 ? `0${value}` : value;
};

const getTime = () => {
  const date = new Date();
  let meridian = "AM";

  let hours = addZero(date.getHours()) as number;
  const minutes = addZero(date.getMinutes());

  if (hours > 12) {
    hours -= 12;
    meridian = "PM";
  }

  return `${hours}:${minutes} ${meridian}`;
};

export default getTime;
