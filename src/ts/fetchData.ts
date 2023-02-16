import {
  CarInterfaceRequest,
  CarRequestValues,
  CarInterface,
} from '../interfaces/carInterface';

const urlScrape = 'https://car-scraper-api.vercel.app/scrape';
const urlScrapeNum = 'https://car-scraper-api.vercel.app/scrape/num';

export async function fetchData(
  data: CarInterfaceRequest,
  pageNum: string,
  setError: React.Dispatch<React.SetStateAction<string>>
) {
  const result = await fetch(urlScrape, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reqData: data, pageNumPolovni: pageNum }),
  });

  if (result.ok) {
    const resultData: { data: false | CarInterface[] } = await result.json();
    if (!resultData.data) {
      setError('no data on page');
      return false;
    }
    return resultData.data;
  }
  setError('failed to fetch data, network error');
  return false;
}

export async function fetchPageNum(
  data: CarInterfaceRequest,
  setError: React.Dispatch<React.SetStateAction<string>>
) {
  const result: Response = await fetch(urlScrapeNum, {
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).catch((e) => {
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

  const result = await fetchData(object, pageNum, setError);
  if (!result) {
    setLoad('error');

    return false;
  }

  setLoad('loaded');
  return result;
}
