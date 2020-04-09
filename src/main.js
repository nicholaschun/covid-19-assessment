import covid19ImpactEstimator from './estimator';

const renderData = (output) => {
  // get all result fields
  console.log(output);
  const inputPopulation = document.querySelector('#inputPopulation');
  const inputTime = document.querySelector('#inputTime');
  const inputReportedCases = document.querySelector('#inputReportedCases');
  const inputHospitalBeds = document.querySelector('#inputHospitalBeds');
  const inputPeriodType = document.querySelector('#inputPeriodType');

  const impactCurrentInfected = document.querySelector(
    '#impactCurrentInfected'
  );
  const impactInfectionsByRequestedTime = document.querySelector(
    '#impactInfectionsByRequestedTime'
  );
  const impactCasesByRequestedTime = document.querySelector(
    '#impactCasesByRequestedTime'
  );
  const impactForICUByReqeustedTime = document.querySelector(
    '#impactForICUByReqeustedTime'
  );
  const impactForCasesForVentilators = document.querySelector(
    '#impactForCasesForVentilators'
  );
  const impactDollarsInFlight = document.querySelector(
    '#impactDollarsInFlight'
  );
  const impactHospitalBedsByRequestedTime = document.querySelector(
    '#impactHospitalBedsByRequestedTime'
  );

  const severeCurrentInfected = document.querySelector(
    '#severeCurrentInfected'
  );
  const severeInfectionsByRequestedTime = document.querySelector(
    '#severeInfectionsByRequestedTime'
  );
  const severeCasesByRequestedTime = document.querySelector(
    '#severeCasesByRequestedTime'
  );
  const severeForICUByReqeustedTime = document.querySelector(
    '#severeForICUByReqeustedTime'
  );
  const severeForCasesForVentilators = document.querySelector(
    '#severeForCasesForVentilators'
  );
  const severeDollarsInFlight = document.querySelector(
    '#severeDollarsInFlight'
  );
  const severeHospitalBedsByRequestedTime = document.querySelector(
    '#severeHospitalBedsByRequestedTime'
  );

  inputPopulation.innerHTML = `<span class='result-data'>${output.data.population}</span>`;
  inputTime.innerHTML = `<span class='result-data'>${output.data.timeToElapse}</span>`;
  inputReportedCases.innerHTML = `<span class='result-data'>${output.data.reportedCases}</span>`;
  inputHospitalBeds.innerHTML = `<span class='result-data'>${output.data.totalHospitalBeds}</span>`;
  inputPeriodType.innerHTML = `<span class='result-data'>${output.data.periodType}</span>`;

  impactCurrentInfected.innerHTML = `<span class='result-impact-data'>${output.impact.currentlyInfected}</span>`;
  impactInfectionsByRequestedTime.innerHTML = `<span class='result-impact-data'>${output.impact.infectionsByRequestedTime}</span>`;
  impactCasesByRequestedTime.innerHTML = `<span class='result-impact-data'>${output.impact.severeCasesByRequestedTime}</span>`;
  impactForICUByReqeustedTime.innerHTML = `<span class='result-impact-data'>${output.impact.casesForICUByRequestedTime}</span>`;
  impactForCasesForVentilators.innerHTML = `<span class='result-impact-data'>${output.impact.casesForVentilatorsByRequestedTime}</span>`;
  impactDollarsInFlight.innerHTML = `<span class='result-impact-data'>${output.impact.dollarsInFlight}</span>`;
  impactHospitalBedsByRequestedTime.innerHTML = `<span class='result-impact-data'>${output.impact.hospitalBedsByRequestedTime}</span>`;

  severeCurrentInfected.innerHTML = `<span class='result-severe-data'>${output.severeImpact.currentlyInfected}</span>`;
  severeInfectionsByRequestedTime.innerHTML = `<span class='result-severe-data'>${output.severeImpact.infectionsByRequestedTime}</span>`;
  severeCasesByRequestedTime.innerHTML = `<span class='result-severe-data'>${output.severeImpact.severeCasesByRequestedTime}</span>`;
  severeForICUByReqeustedTime.innerHTML = `<span class='result-severe-data'>${output.severeImpact.casesForICUByRequestedTime}</span>`;
  severeForCasesForVentilators.innerHTML = `<span class='result-severe-data'>${output.severeImpact.casesForVentilatorsByRequestedTime}</span>`;
  severeDollarsInFlight.innerHTML = `<span class='result-severe-data'>${output.severeImpact.dollarsInFlight}</span>`;
  severeHospitalBedsByRequestedTime.innerHTML = `<span class='result-severe-data'>${output.severeImpact.hospitalBedsByRequestedTime}</span>`;
};

const processData = (event) => {
  event.preventDefault();
  const population = parseInt(document.querySelector('#population').value, 10);
  const timeToElapse = parseInt(
    document.querySelector('#timeToElapse').value,
    10
  );
  const reportedCases = parseInt(
    document.querySelector('#reportedCases').value,
    10
  );
  const totalHospitalBeds = parseInt(
    document.querySelector('#totalHospitalBeds').value,
    10
  );
  const periodType = document.querySelector('#periodType').value;

  const inputFormat = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 4,
      avgDailyIncomePopulation: 0.73
    },
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  };
  renderData(covid19ImpactEstimator(inputFormat));
};

const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', processData);
