import { Address } from "src/app/models/shared.models";

export interface AccommodationCard{
    id: number;
    title?: string;
    address?: Address;
    image?: string;
    description? : string;
}