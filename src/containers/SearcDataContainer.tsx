import { useEffect, useState } from 'react';
import Header from './Header';
import Content from './Content';
import { CarInterface } from '../interfaces/carInterface';

export default function SearchDataContainer() {
  const [dataAvailable, setDataAvailable] = useState<false | string>(false);

  useEffect(() => {
    const storedDataId = localStorage.getItem('dataId');

    if (storedDataId !== null) {
      setDataAvailable(storedDataId);
    } else {
      setDataAvailable(false);
    }
  }, []);

  return (
    <>
      <Header setContent={setDataAvailable} />
      <Content dataAvailable={dataAvailable} />
    </>
  );
}
