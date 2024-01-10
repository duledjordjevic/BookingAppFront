import { Guest, Host, User } from "src/app/infrastructure/auth/model/user.model";
import { Accommodation } from "./accommodation.model";

export interface Reservation {
    id?: number;
    startDate?: Date;
    endDate?: Date;
    numberOfGuests?: number;
    guestId?: number
    accommodationId?: number;
    price?: number;
    status?: ReservationStatus;
    accommodation?: Accommodation;
    guest?: Guest;
    host?:Host;
}

export enum ReservationStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    EXPIRED = "EXPIRED",
    DECLINED = "DECLINED",
    CANCELLED = "CANCELLED"
}
export interface ReservationFilter {
    userId?: number;
    title?: string;
    startDate?: Date;
    endDate?: Date;
    status?: ReservationStatus;
    [key: string]: number | string | Date | undefined;
}