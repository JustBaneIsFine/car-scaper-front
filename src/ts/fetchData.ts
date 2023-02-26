import {
  CarInterfaceRequest,
  CarRequestValues,
  CarInterface,
} from '../interfaces/carInterface';

const urlScrape = 'https://car-scraper-api.vercel.app/scrape';
const urlScrapeNum = 'https://car-scraper-api.vercel.app/scrape/num';
// const urlScrapeNum = 'http://localhost:3000/scrape/num';

export async function fetchData(
  data: CarInterfaceRequest,
  pageNum: number,
  setError: React.Dispatch<React.SetStateAction<string>>
) {
  const result = await fetch(urlScrape, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reqData: data, pageNumPolovni: pageNum }),
  }).catch((e) => {
    console.log(e);
    return e;
  });

  if (result.ok) {
    const resultData: { data: false | CarInterface[] } = await result.json();
    if (!resultData.data) {
      setError('no data on page');
      return false;
    }
    return resultData.data;
  }
  setError('failed to fetch some data');
  return false;
}

export async function fetchPageNum(
  data: CarInterfaceRequest,
  setError: React.Dispatch<React.SetStateAction<string>>
) {
  const result: Response = await fetch(urlScrapeNum, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).catch((e) => {
    console.log(e);

    return e;
  });

  if (result.ok) {
    const resultData: { data: string | false; error: string } =
      await result.json();

    if (!resultData.data) {
      setError('No data on page');
    }
    return resultData.data;
  }
  setError('failed to fetch data, network error');
  return false;
}

export async function handleFetching(
  setLoad: React.Dispatch<
    React.SetStateAction<'none' | 'error' | 'loaded' | 'loading'>
  >,
  object: CarInterfaceRequest,
  setError: React.Dispatch<React.SetStateAction<string>>
) {
  setLoad('loading');
  const pageNum = await fetchPageNum(object, setError);
  if (!pageNum) {
    setLoad('error');
    return false;
  }

  const numOfPages = parseInt(pageNum, 10);
  let newNum;
  if (numOfPages > 10) {
    console.log('more than 10 pages');
    newNum = 10;
  } else {
    newNum = numOfPages;
  }

  // test code
  // sending requests for each page individualy
  const resultArray = [];

  for (let i = 1; i <= newNum; i += 1) {
    resultArray.push(fetchData(object, i, setError));
  }
  console.log('waiting for result array promise');
  const finalResult = await Promise.all(resultArray);
  console.log('finished waiting_____________');
  console.log(finalResult);

  // test code

  // const result = await fetchData(object, pageNum, setError);
  // if (!result) {
  //   setLoad('error');

  //   return false;
  // }

  setLoad('loaded');
  return finalResult;
}
