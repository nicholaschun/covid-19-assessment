const calCulateActualDay = (periodType, timeToElapse) => {
  let result = null;
  if (periodType === 'days') {
    result = Math.floor(timeToElapse / 3);
  } else if (periodType === 'weeks') {
    result = Math.floor((timeToElapse * 7) / 3);
  } else if (periodType === 'months') {
    result = Math.floor((timeToElapse * 30) / 3);
  } else {
    return null;
  }
  return result;
};

export default calCulateActualDay;
