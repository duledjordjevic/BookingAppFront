import { Address } from "src/app/models/shared.models";

export interface AccommodationDetails {
    title: string;
    description: string;
    minGuests: number;
    maxGuests: number;
    address: Address;
    amenities:Amenities[];
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