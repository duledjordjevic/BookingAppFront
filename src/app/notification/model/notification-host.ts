export interface NotificationHost{
    id?:number;
    title?:string;
    type?:NotificationType;
    description?:string;
    read?:boolean;
    icon?:string;
    dateTime?:Date;
    dateParsed?:string;
}
export enum NotificationType{
    RESERVATION_REQUEST = 'RESERVATION_REQUEST',
    CREATED_RESERVATION = 'CREATED_RESERVATION',
    CANCELLED_RESERVATION = 'CANCELLED_RESERVATION',
    NEW_REVIEW = 'NEW_REVIEW',
    RESERVATION_REQUEST_RESPOND = 'RESERVATION_REQUEST_RESPOND'
}

export interface CreateNotification{
    type?:NotificationType;
    description?:string;
    hostId?:number;
}