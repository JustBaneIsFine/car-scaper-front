export interface CarInterface {
  CarName: string;
  CarYear: string;
  CarPrice: string;
  CarFuel: string;
  CarCC: string;
  CarKM: string;
  href: string;
  id: string;
}

export interface CarInterfaceRequest {
  carMake: string;
  carModel: string;
  carYearStart: string;
  carYearEnd: string;
}

export interface CarRequestValues extends CarInterfaceRequest {
  polovniNum: string;
  kupujemNum: string;
}
