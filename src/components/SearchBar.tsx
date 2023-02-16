import { useEffect, useRef, useState } from 'react';
import ButtonClassic from './Buttons/ButtonClassic';
import loadingImg from '../assets/icons/loading.png';
import checkImg from '../assets/icons/check.png';
import errorImg from '../assets/icons/error.png';
import valuesList from '../assets/FinalDataCollection.json';
import yearsList from '../assets/yearValues.json';

import LoadingInterface from '../interfaces/loadingInterface';
import { fetchData, fetchPageNum, handleFetching } from '../ts/fetchData';
import { CarInterfaceRequest } from '../interfaces/carInterface';
import { InputErrorState } from '../interfaces/StateInterfaces';
import checkInputs, {
  generateObject,
  returnMakeList,
  returnModelList,
  returnYearList,
} from '../ts/checkInputs';

export default function SearchBar() {
  const [errorState, setErrorState] = useState({} as InputErrorState);
  const [loadState, setLoadState] =
    useState<LoadingInterface['values']>('none');
  const [currentMake, setCurrentMake] = useState('string');
  const [fetchError, setFetchError] = useState('');

  const errorStateObject = { state: errorState, setState: setErrorState };

  useEffect(() => {
    setErrorState({
      makeError: false,
      modelError: false,
      yearStart: false,
      yearEnd: false,
    });
  }, []);
  const refMake = useRef<HTMLInputElement>(null);
  const refModel = useRef<HTMLInputElement>(null);
  const refYearStart = useRef<HTMLInputElement>(null);
  const refYearEnd = useRef<HTMLInputElement>(null);

  // Search bar contains 4 input points
  // Left ---> Make
  // Mid ---> Model
  // Right.Left ---> YearStart
  // Right.Right ---> YearEnd

  return (
    <div className=" m-auto flex w-4/6 flex-col gap-3 rounded-xl border border-black p-10 shadow-xl sm:w-auto sm:gap-0 ">
      <div className="flex flex-col sm:flex-row">
        <div className=" flex items-center justify-center sm:flex-col sm:gap-3">
          <div className="my-2 flex sm:my-0 sm:mx-2">
            <input
              list="makeItems"
              required
              ref={refMake}
              type="select"
              onChange={() => {
                setCurrentMake(
                  refMake?.current?.value === undefined
                    ? ''
                    : refMake.current.value
                );
              }}
              placeholder={errorState.makeError ? 'Incorrect choice' : 'Make'}
              className={`m-auto flex w-5/6 rounded-sm border border-black p-1 shadow-md sm:w-full ${
                errorState.makeError
                  ? ' animate-pulse border-2 border-red-600'
                  : ''
              }`}
            />

            <datalist id="makeItems">{returnMakeList()}</datalist>
          </div>
        </div>
        <div className="flex items-center justify-center sm:flex-col sm:gap-3">
          <div className="my-2 flex sm:my-0 sm:mx-2">
            <input
              list="modelItems"
              required
              ref={refModel}
              type="text"
              placeholder={errorState.modelError ? 'Incorrect choice' : 'Model'}
              className={`m-auto flex w-5/6 rounded-sm border border-black p-1 shadow-md sm:w-full ${
                errorState.modelError
                  ? ' animate-pulse border-2 border-red-600'
                  : ''
              }`}
            />
            <datalist id="modelItems">
              {currentMake !== ''
                ? returnModelList(refMake?.current?.value)
                : ''}
            </datalist>
          </div>
        </div>
        <div className="flex  items-center justify-center sm:flex-col sm:gap-3">
          <div className="my-2 flex sm:my-0 sm:mx-2 ">
            <input
              required
              list="yearStartList"
              ref={refYearStart}
              type="text"
              placeholder={
                errorState.yearStartError ? 'incorrect choice' : 'Year start'
              }
              className={`m-auto flex w-5/6 rounded-sm border border-black p-1 shadow-md sm:w-full ${
                errorState.yearStartError
                  ? ' animate-pulse border-2 border-red-600'
                  : ''
              }`}
            />
            <datalist id="yearStartList">{returnYearList()}</datalist>
          </div>
        </div>
        <div className="flex items-center justify-center sm:flex-col sm:gap-3">
          <div className="my-2 flex sm:my-0 sm:mx-2">
            <input
              required
              list="yearEndList"
              ref={refYearEnd}
              type="text"
              placeholder={
                errorState.yearEndError ? 'incorrect choice' : 'Year end'
              }
              className={`m-auto flex w-5/6 rounded-sm border border-black  p-1 shadow-md sm:w-full ${
                errorState.yearEndError
                  ? ' animate-pulse border-2 border-red-600'
                  : ''
              }`}
            />
            <datalist id="yearEndList">{returnYearList()}</datalist>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col  justify-center text-center sm:p-4">
        <div className="flex w-full justify-center ">
          <img
            src={returnLoadState()}
            alt=""
            className={`${loadState === 'none' ? '' : 'h-10 w-10'} ${
              loadState === 'loading' ? 'animate-spin' : ''
            }`}
          />
        </div>
        <div className="w-full">{fetchError}</div>
      </div>
      <div className="m-auto flex w-1/6 justify-center sm:flex-col">
        <ButtonClassic
          name="Submit"
          onclick={async () => {
            const object = generateObject(
              refMake,
              refModel,
              refYearEnd,
              refYearEnd
            );
            const inputValid = await checkInputs(object, errorStateObject);

            if (!inputValid) {
              return;
            }
            await handleFetching(setLoadState, object, setFetchError);
          }}
        />
      </div>
    </div>
  );
  function returnLoadState() {
    switch (loadState) {
      case 'loaded':
        return checkImg;
        break;
      case 'loading':
        return loadingImg;
        break;
      case 'error':
        return errorImg;
        break;
      default:
        return '.';
        break;
    }
  }
}
