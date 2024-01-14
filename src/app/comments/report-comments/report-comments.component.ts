import {Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {environment} from "../../../env/env";
import {Accommodation} from "../../accommodation/model/accommodation.model";
import {CommentAboutAcc} from "../model/comment-about-acc-model";
import {CommentsService} from "../services/comments.service";
import {CommentAboutHost} from "../model/comment-about-host.model";

@Component({
  selector: 'app-report-comments',
  templateUrl: './report-comments.component.html',
  styleUrls: ['./report-comments.component.css']
})
export class ReportCommentsComponent {

	@Input() color: ThemePalette = 'accent';
	@Input('starCount') starCount: number = 5;

	@Input('rating') rating: number = 1;
	@Output() ratingUpdated = new EventEmitter();

	@ViewChild('matButton', { static: true }) matButton!: ElementRef;

	ratingArr: number[] = [];
	ratingsAcc: { [key: number]: number } = {};
	ratingsHost: { [key: number]: number } = {};

	imageBase64:string = environment.imageBase64;
	userIcon = "assets/images/user-circle.svg";

	reportedCommentsAboutAcc: CommentAboutAcc[] = [];
	haveCommentsAboutAccForDisplay: boolean = true;
	reportedCommentsAboutHost: CommentAboutHost[] = [];
	haveCommentsAboutHostForDisplay: boolean = true;

	commentsAboutAccVisible = false;
	commentsAboutHostVisible = false;

	constructor(private renderer: Renderer2, private commentsService: CommentsService) { }

	ngOnInit() {
		for (let index = 0; index < this.starCount; index++) {
			this.ratingArr.push(index);
		}

		this.getReportedCommentsAboutAcc();
		this.getReportedCommentsAboutHost();
	}

	getReportedCommentsAboutAcc(): void {
		this.commentsService.getReportedCommentsAboutAcc().subscribe( {
			next:(result: CommentAboutAcc[]) =>{
				this.reportedCommentsAboutAcc = result;
				if(this.reportedCommentsAboutAcc.length == 0){
					this.haveCommentsAboutAccForDisplay = false;
				}
				this.reportedCommentsAboutAcc.forEach(com => {
					this.ratingsAcc[com.id as number] = 1;
				});
				console.log(this.reportedCommentsAboutAcc);
			}
		})
	}

	getReportedCommentsAboutHost(): void {
		this.commentsService.getReportedCommentsAboutHost().subscribe( {
			next:(result: CommentAboutHost[]) =>{
				this.reportedCommentsAboutHost = result;
				if(this.reportedCommentsAboutHost.length == 0){
					this.haveCommentsAboutHostForDisplay = false;
				}
				this.reportedCommentsAboutHost.forEach(com => {
					this.ratingsHost[com.id as number] = 1;
				});
				console.log(this.reportedCommentsAboutHost);
			}
		})
	}
	showIcon(index: number, commentRating: number | undefined) {
		this.rating = commentRating as number;
		if (this.rating >= index + 1) {
			return 'star';
		} else {
			return 'star_border';
		}
	}

	deleteCommentAboutAcc(commentId: number | undefined): void {
		this.commentsService.deleteCommentAboutAcc(commentId as number).subscribe({
			next: (deletedComm) => {
				console.log(deletedComm);
				this.getReportedCommentsAboutAcc();
			},
			error: (error) => {
				console.error("Error deleting comment about acc:", error);
			}
		});
	}

	deleteCommentAboutHost(commentId: number | undefined): void {
		this.commentsService.deleteCommentAboutHost(commentId as number).subscribe({
			next: (deletedComm) => {
				console.log(deletedComm);
				this.getReportedCommentsAboutHost();
			},
			error: (error) => {
				console.error("Error deleting comment about host:", error);
			}
		});
	}

	showCommentsAboutAcc() {
		this.commentsAboutAccVisible = !this.commentsAboutAccVisible;
	}
	showCommentsAboutHost() {
		this.commentsAboutHostVisible = !this.commentsAboutHostVisible;
	}
}
