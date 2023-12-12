import { Address } from "src/app/models/shared.models";

export interface AccommodationDetails {
    title: string;
    description: string;
    minGuest: number;
    maxGuest: number;
    address: Address;
    amenities:Amenities[];
    images:string[];
}

export enum Amenities {
    WIFI = "WIFI",
    AIRCONDITION = "AIRCONDITION",
    PARKING = "PARKING",
    BREAKFAST = "BREAKFAST",
    POOL = "POOL",
    KITCHEN = "KITCHEN"
}

export interface AmenitiesIcons{
    name: string;
    icon: string;
}