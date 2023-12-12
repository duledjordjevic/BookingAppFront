import { Address } from "src/app/models/shared.models";

export interface AccommodationDetails {
    id: number,
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
    LUNCH = "LUNCH",
    DINNER ="DINNER",
    POOL = "POOL",
    KITCHEN = "KITCHEN",
    TV = "TV"
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