import { CarInterfaceRequest } from '../interfaces/carInterface';
import { InputErrorState } from '../interfaces/StateInterfaces';
import valuesArray from '../assets/FinalDataCollection.json';
import yearsArray from '../assets/yearValues.json';

const url = 'https://car-scraper-api.vercel.app/scrape';

export default async function checkInputs(
  data: {
    CarMake: string;
    CarModel: string;
    CarYearStart: string;
    CarYearEnd: string;
  },
  errorState: {
    state: InputErrorState;
    setState: React.Dispatch<React.SetStateAction<InputErrorState>>;
  }
) {
  let error = false;
  if (isEmpty(data.CarMake) || !matchMake(data.CarMake)) {
    errorState.setState((prev) => ({
      ...prev,
      makeError: true,
    }));
    return false;
  }
  errorState.setState((prev) => ({
    ...prev,
    makeError: false,
  }));

  if (isEmpty(data.CarModel) || !matchData(data.CarMake, data.CarModel)) {
    errorState.setState((prev) => ({ ...prev, modelError: true }));
    error = true;
  } else {
    errorState.setState((prev) => ({ ...prev, modelError: false }));
  }
  if (isEmpty(data.CarYearStart) || !matchYear(data.CarYearStart)) {
    errorState.setState((prev) => ({ ...prev, yearStartError: true }));
  } else {
    errorState.setState((prev) => ({ ...prev, yearStartError: false }));
  }
  if (isEmpty(data.CarYearEnd) || !matchYear(data.CarYearEnd)) {
    errorState.setState((prev) => ({ ...prev, yearEndError: true }));
    error = true;
  } else {
    errorState.setState((prev) => ({ ...prev, yearEndError: false }));
  }

  if (error) {
    return false;
  }
  return true;
}

function isEmpty(x: string) {
  if (x === '') {
    return true;
  }
  return false;
}

function matchData(make: string, model: string) {
  const makeObject = matchMake(make);
  if (makeObject === false) {
    return false;
  }
  const modelObject = makeObject.models.find((x) => x.name === model);
  if (modelObject === undefined) {
    return false;
  }
  return true;
}

function matchMake(make: string) {
  const makeObject = valuesArray.find((x) => x.name === make);
  if (makeObject === undefined) {
    return false;
  }
  return makeObject;
}
function matchYear(year: string) {
  const value = yearsArray.find((x) => x === year);
  if (value === undefined) {
    return false;
  }
  return true;
}

export function generateObject(
  refMake: React.RefObject<HTMLInputElement>,
  refModel: React.RefObject<HTMLInputElement>,
  refYearStart: React.RefObject<HTMLInputElement>,
  refYearEnd: React.RefObject<HTMLInputElement>
): CarInterfaceRequest {
  return {
    CarMake: refMake?.current?.value === undefined ? '' : refMake.current.value,

    CarModel:
      refModel?.current?.value === undefined ? '' : refModel.current.value,

    CarYearStart:
      refYearStart?.current?.value === undefined
        ? ''
        : refYearStart.current.value,
    CarYearEnd:
      refYearEnd?.current?.value === undefined ? '' : refYearEnd.current.value,
  };
}

export function returnMakeList() {
  return valuesArray.map((x) => (
    <option value={x.name} key={x.name}>
      {x.name}
    </option>
  ));
}

export function returnModelList(make: string | undefined) {
  if (make === undefined || isEmpty(make)) {
    return 'no data';
  }

  const makeObj = matchMake(make);
  if (!makeObj) {
    return 'no data';
  }
  return makeObj.models.map((modelObj) => (
    <option value={modelObj.name} key={modelObj.name}>
      {modelObj.name}
    </option>
  ));
}

export function returnYearList() {
  return yearsArray.map((x) => (
    <option value={x} key={x}>
      {x}
    </option>
  ));
}
