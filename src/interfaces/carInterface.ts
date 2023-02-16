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
  CarMake: string;
  CarModel: string;
  CarYearStart: string;
  CarYearEnd: string;
}

export interface CarRequestValues extends CarInterfaceRequest {
  polovniNum: string;
  kupujemNum: string;
}
