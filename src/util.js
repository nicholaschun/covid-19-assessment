const calCulateActualDay = (periodType, timeToElapse) => {
  let result = null;
  if (periodType.toLowerCase() === 'days') {
    result = timeToElapse;
  } else if (periodType.toLowerCase() === 'weeks') {
    result = Math.floor(timeToElapse * 7);
  } else if (periodType.toLowerCase() === 'months') {
    result = Math.floor(timeToElapse * 30);
  } else {
    return null;
  }
  return result;
};

export default calCulateActualDay;
