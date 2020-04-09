import calCulateActualDay from './util';

const infectionByTimeRequest = (currentlyInfected, periodType, days) => {
  const actualDays = calCulateActualDay(periodType, days);
  return Math.floor(currentlyInfected * 2 ** (actualDays / 3));
};

const covid19ImpactEstimator = (data) => {
  const output = {
    data,
    impact: {
      currentlyInfected: 0,
      infectionByTimeRequest: 0
    },
    severeImpact: {
      currentlyInfected: 0,
      infectionByTimeRequest: 0
    }
  };

  output.impact.currentlyInfected = data.reportedCases * 10;

  output.severeImpact.currentlyInfected = data.reportedCases * 50;

  output.impact.infectionByTimeRequest = infectionByTimeRequest(
    output.impact.currentlyInfected,
    data.periodType,
    data.timeToElapse
  );

  return output;
};

export default covid19ImpactEstimator;
