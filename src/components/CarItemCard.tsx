import { CarInterface } from '../interfaces/carInterface';

export default function CarItemCard({ carData }: { carData: CarInterface }) {
  return (
    <div className="m-2  h-96 w-40  rounded-xl border-x-2 border-y-4 border-x-slate-600 border-y-slate-800 bg-slate-300 px-1 shadow-lg shadow-black  dark:border-y-slate-300 dark:bg-zinc-800">
      <div>
        <div className=" pt-1">
          <a href={carData.Href} target="_blank" rel="noopener noreferrer">
            <img src={carData.ImageUrl} alt="" className="rounded-xl" />
          </a>
        </div>
        <div className="">
          <div className="mb-2 flex h-20  justify-center overflow-hidden  pt-2 text-center ">
            {carData.CarName}
          </div>
          <div className="w-full border border-black dark:border-white" />
          <div className=" flex flex-col">
            <div className="">
              <span className="font-light">Cena: </span>
              <span className="u font-bold">{carData.CarPrice}</span>
            </div>
            <div className="">
              <span className="font-light">Godiste: </span>
              <span className="u font-bold">{carData.CarYear}</span>
            </div>
            <div>
              <span className="font-light">Kubikaza: </span>
              <span className="u font-bold">{carData.CarCC}cc</span>
            </div>
            <div>
              <div>
                <span className="font-light">Gorivo: </span>
                <span className="u font-bold">{carData.CarFuel}</span>
              </div>
              <span className="font-light">Kilometraza: </span>
              <span className="u font-bold">{carData.CarKM}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
