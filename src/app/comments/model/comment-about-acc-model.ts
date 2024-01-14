import {Accommodation} from "../../accommodation/model/accommodation.model";

export interface CommentAboutAcc{
	id?: number;
	rating?: number;
	content?: string;
	guestName?: string;
	guestLastName?: string;
	guestEmail?: string;
	date?: Date;
	accommodationId?: number;
	guestId?: number;
	accommodation?: Accommodation;
	coverImage?: string;
	ratingDescription?: string;
	reportMessage?: string;
}
