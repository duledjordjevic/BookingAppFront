import {Host} from "../../infrastructure/auth/model/user.model";

export interface CommentAboutHost{
	id?: number;
	rating?: number;
	isReported?: boolean;
	content?: string;
	isApproved?: boolean;
	guestName?: string;
	guestLastName?: string;
	guestEmail?: string;
	date?: Date;
	hostId?: number;
	guestId?: number;
	host?: Host;
	ratingDescription?: string;
	reportMessage?: string;
}
