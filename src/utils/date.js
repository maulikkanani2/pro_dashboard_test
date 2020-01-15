export const dateToMilliseconds = date => {
  let time = 0;
  time += date.getHours() * 60 * 60 * 1000;
  time += date.getMinutes() * 60 * 1000;
  time += date.getSeconds() * 1000;
  return time;
};

export const millisecondsToDate = milliseconds => {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

  return new Date(1970, 0, 1, hours, minutes, seconds);
};

export const utcToLocalDate = utcDate => {
  const utcOffset = new Date().getTimezoneOffset() * 60 * 1000;
  return Date.parse(utcDate) - utcOffset;
};
