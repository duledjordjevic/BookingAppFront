export interface NotificationGuest{
    id?:number;
    title?:string;
    description?:string;
    read?:boolean;
    icon?:string;
    dateTime?:Date;
    dateParsed?:string;
}

export interface CreateNotificationGuest{
    description?:string;
    hostId?:number;
}