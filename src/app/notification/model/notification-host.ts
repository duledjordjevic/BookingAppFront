export interface NotificationHost{
    id?:number;
    title?:string;
    type?:NotificationType;
    description?:string;
    read?:boolean;
    icon?:string;
}
export enum NotificationType{
    RESERVATION_REQUEST = 'RESERVATION_REQUEST',
    CANCELLED_RESERVATION = 'CANCELLED_RESERVATION',
    NEW_REVIEW = 'NEW_REVIEW',
    RESERVATION_REQUEST_RESPOND = 'RESERVATION_REQUEST_RESPOND'
}