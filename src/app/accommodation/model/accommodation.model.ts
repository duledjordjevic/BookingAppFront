import { Address } from "src/app/models/shared.models";
import {ReservationMethod} from "./reservation-method.model";
import {CancellationPolicy} from "./cancellation-policy.model";
import {ApprovalStatus} from "./approval-status.model";
import {PriceList} from "./price-list.model";

export interface AccommodationDetails {
    id: number,
    title: string;
    description: string;
    minGuest: number;
    maxGuest: number;
    address: Address;
    amenities:Amenities[];
    images:string[];
	hostId?: number;
	accommodationApprovalStatus? : AccommodationApprovalStatus;
}

export enum AccommodationApprovalStatus {
	PENDING = "PENDING",
    APPROVED = "APPROVED",
    DECLINED = "DECLINED",
}
export enum Amenities {
    WIFI = "WIFI",
    AIRCONDITION = "AIRCONDITION",
    PARKING = "PARKING",
    BREAKFAST = "BREAKFAST",
    LUNCH = "LUNCH",
    DINNER ="DINNER",
    POOL = "POOL",
    KITCHEN = "KITCHEN",
    TV = "TV"
}
export enum AccommodationType{
    HOTEL = "HOTEL",
    APARTMENT = "APARTMENT"
}
export interface AmenitiesIcons{
    name: string;
    icon: string;
}

export interface AccommodationPopular{
    id?:number;
    title?:string;
    address?: Address;
    avgRate?: number;
    pricePerNight?: number;
    totalPrice?:number;
    image?: string;
}

export interface Accommodation{
	id?: number | null;
	title?: string;
	type?: AccommodationType;
	description?: string;
	cancellationPolicy?: CancellationPolicy;
	reservationMethod?: ReservationMethod;
	minGuest?: number;
	maxGuest?: number;
	address?: Address;
	amenities?:Amenities[];
	isPriceForEntireAcc?: boolean;
	accommodationApprovalStatus?: ApprovalStatus;
	hostId?: number;
	prices?: PriceList[] | null;
	images?: string[] | null;
}

export interface AccommodationCreate{
	id: number;
	title: string;
	description: string;
	amenities?: Amenities[];
	images: string;
	minGuests: number;
	maxGuests: number;
	type: AccommodationType;
	cancellationPolicy: CancellationPolicy;
	accommodationApprovalStatus: ApprovalStatus;
	reservationMethod: ReservationMethod;
	isPriceForEntireAcc: boolean;
	prices: PriceList[];
	hostId: number;
	address: Address;
}
