export interface NotificationHost{
    id?:number;
    type?:NotificationType;
    description?:string;
    isRead?:boolean;
}
export enum NotificationType{
    RESERVATION_REQUEST = 'RESERVATION_REQUEST',
    CANCELLED_RESERVATION = 'CANCELLED_RESERVATION',
    NEW_REVIEW = 'NEW_REVIEW',
    RESERVATION_REQUEST_RESPOND = 'RESERVATION_REQUEST_RESPOND'
}