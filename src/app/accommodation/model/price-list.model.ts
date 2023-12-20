import {AccommodationStatus} from "./accommodation-status.model";

export interface PriceList{
	id: number;
	date?: Date;
	price: number;
	status: AccommodationStatus;
}
