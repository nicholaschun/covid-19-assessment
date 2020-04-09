const calCulateActualDay = (periodType, timeToElapse) => {
  let result = null;
  if (periodType === 'days') {
    result = timeToElapse;
  } else if (periodType === 'weeks') {
    result = Math.floor(timeToElapse * 7);
  } else if (periodType === 'months') {
    result = Math.floor(timeToElapse * 30);
  } else {
    return null;
  }
  return result;
};

export default calCulateActualDay;
