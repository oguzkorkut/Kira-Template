import { County } from "./county";

export class City{
    id: number;
    cityCode: string;
    cityName: string;
    countyDto: County[];
}