import { useEffect, useState } from 'react';
import Header from './Header';
import Content from './Content';
import { CarInterface } from '../interfaces/carInterface';

export default function SearchDataContainer() {
  const [data, setData] = useState<CarInterface[]>([]);

  useEffect(() => {
    const storageList: null | string = localStorage.getItem('data');
    if (storageList === null) {
      return;
    }

    setData(JSON.parse(storageList));
  }, []);

  return (
    <>
      <Header setContent={setData} />
      <Content content={data} />
    </>
  );
}
