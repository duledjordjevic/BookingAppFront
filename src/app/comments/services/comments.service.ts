import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Accommodation, AccommodationPopular} from "../../accommodation/model/accommodation.model";
import {environment} from "../../../env/env";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {AuthService} from "../../infrastructure/auth/services/auth.service";
import {UserInfo} from "../../user/model/user.model";
import {CommentAboutHost} from "../model/comment-about-host.model";
import {CommentAboutAcc} from "../model/comment-about-acc-model";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient,private datePipe: DatePipe,private authService: AuthService) { }

	getGuestAccommodations(guestUserId: number): Observable<Accommodation[]>{
		const url = environment.apiHost + `accommodations/guest/${guestUserId}`;
		return this.http.get<Accommodation[]>(url);
	}

	getCommentsAboutHostForGuest(guestUserId: number): Observable<CommentAboutHost[]>{
		const url =  environment.apiHost + `commentsAboutHost/guest/${guestUserId}`;
		return this.http.get<CommentAboutHost[]>(url);
	}

	deleteCommentAboutHost(id: number): Observable<CommentAboutHost>{
		const url =  environment.apiHost + `commentsAboutHost/${id}`;
		return this.http.delete<CommentAboutHost>(url);
	}

	createCommentAboutHost(commentAboutHost: CommentAboutHost): Observable<CommentAboutHost>{
		const url = environment.apiHost + 'commentsAboutHost';
		return this.http.post<CommentAboutHost>(url, commentAboutHost, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		});
	}

	getGuestAccommodationsForComment(guestUserId: number): Observable<Accommodation[]>{
		const url = environment.apiHost + `accommodations/guest/comment/${guestUserId}`;
		return this.http.get<Accommodation[]>(url);
	}

	getCommentsAboutAcctForGuest(guestUserId: number): Observable<CommentAboutAcc[]>{
		const url =  environment.apiHost + `commentsAboutAcc/guest/${guestUserId}`;
		return this.http.get<CommentAboutAcc[]>(url);
	}

	deleteCommentAboutAcc(id: number): Observable<CommentAboutAcc>{
		const url =  environment.apiHost + `commentsAboutAcc/${id}`;
		return this.http.delete<CommentAboutAcc>(url);
	}

	createCommentAboutAcc(commentAboutHost: CommentAboutHost): Observable<CommentAboutAcc>{
		const url = environment.apiHost + 'commentsAboutAcc';
		return this.http.post<CommentAboutAcc>(url, commentAboutHost, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		});
	}

	approveCommentAboutAcc(id: number, isApproved: boolean): Observable<CommentAboutAcc> {
		const url = environment.apiHost + `commentsAboutAcc/${id}/approve/${isApproved}`;
		return this.http.put<CommentAboutAcc>(url, {});
	}

	getCommentsForApproving(): Observable<CommentAboutAcc[]>{
		const url =  environment.apiHost + `commentsAboutAcc/approving`;
		return this.http.get<CommentAboutAcc[]>(url);
	}

}
