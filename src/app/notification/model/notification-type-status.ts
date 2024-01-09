import { User } from "src/app/infrastructure/auth/model/user.model";
import { NotificationType } from "./notification-host";

export interface NotificationTypeStatus{
    user?:User;
    type?:NotificationType;
    isTurned?:boolean;
}