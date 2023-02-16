export interface CarInterface {
  CarName: string;
  CarPrice: string;
  CarFuel: string;
  CarKM: string;
  CarCC: string;
  CarYear: string;
  Href: string;
  Id: string;
  ImageUrl: string;
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
