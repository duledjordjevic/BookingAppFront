import { Reservation, ReservationStatus } from "../model/reservation.model";

const mockReservation: Reservation = {
    id: 1,
    startDate: new Date('2024-01-20'),
    endDate: new Date('2024-01-25'),
    numberOfGuests:4,
    guestId:1,
    accommodationId: 1,
    price: 1000,
    status: ReservationStatus.PENDING,
    accommodation: undefined,
    guest: undefined,
    host:undefined,
    hostReported:false,
    guestReported:false
};

export {mockReservation}