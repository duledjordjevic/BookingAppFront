import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	Renderer2,
	ViewChild
} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {Accommodation} from "../../accommodation/model/accommodation.model";
import {CommentAboutHost} from "../model/comment-about-host.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommentsService} from "../services/comments.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../infrastructure/auth/services/auth.service";

@Component({
  selector: 'app-comment-acc',
  templateUrl: './comment-acc.component.html',
  styleUrls: ['./comment-acc.component.css']
})
export class CommentAccComponent {

	@Input() color: ThemePalette = 'accent';
	@Input('starCount') starCount: number = 5;

	@Input('rating') rating: number = 1;
	@Output() ratingUpdated = new EventEmitter();

	@Input('rating') ratingOld: number = 1;
	@Output() ratingUpdatedOld = new EventEmitter();

	@ViewChild('matButton', { static: true }) matButton!: ElementRef;
	@ViewChild('matButton', { static: true }) matButtonOld!: ElementRef;

	private setTouchTargetStyles() {
		const touchTarget = this.matButton.nativeElement.querySelector('.mat-mdc-button-touch-target');
		if (touchTarget) {
			this.renderer.setStyle(touchTarget, 'width', '24px');
			this.renderer.setStyle(touchTarget, 'height', '24px');
		}
	}

	snackBarDuration: number = 2000;
	ratingArr: number[] = [];
	ratingArrOld: number[] = [];
	// commentContent: string = '';
	commentContent: { [key: number]: string } = {};
	ratings: { [key: number]: number } = {};

	accIcon = "assets/images/side1.jpg";
	accommodations: Accommodation[] = [];
	commentsForDeleting: CommentAboutHost[] = [];

	constructor(private snackBar: MatSnackBar, private cdr: ChangeDetectorRef,
				private renderer: Renderer2, private commentsService: CommentsService,
				private route: ActivatedRoute, private authService: AuthService) { }

	ngOnInit() {
		for (let index = 0; index < this.starCount; index++) {
			this.ratingArr.push(index);
			this.ratingArrOld.push(index);
		}

		this.commentsService.getGuestAccommodations(this.authService.getId()).subscribe({
			next:(resultAcc: Accommodation[]) =>{
				this.accommodations = resultAcc;
				this.accommodations.forEach(acc => {
					this.commentContent[acc.id as number] = '';
				});
				this.accommodations.forEach(acc => {
					this.ratings[acc.id as number] = 1;
				});
			}
		})

		this.getCommentsAboutHost();
	}

	getCommentsAboutHost(): void {
		this.commentsService.getCommentsAboutHostForGuest(this.authService.getId()).subscribe({
			next:(result: CommentAboutHost[]) =>{
				this.commentsForDeleting = result;
			}
		})
	}

	onClick(rating: number) {

		this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
			duration: this.snackBarDuration
		});

		// this.ratingUpdated.emit(this.ratings[accId as number]);
		// this.ratings[accId as number] = rating;
		this.cdr.detectChanges();

		return false;
	}


	showIcon(index: number) {
		// if (this.ratings[accId as number] >= index + 1) {
		// 	return 'star';
		// } else {
		// 	return 'star_border';
		// }
	}

	showIconOld(index: number, commentRating: number | undefined) {
		this.ratingOld = commentRating as number;
		if (this.ratingOld >= index + 1) {
			return 'star';
		} else {
			return 'star_border';
		}
	}

	addComment(host?: number | undefined, acc?: number | null | undefined): void {
		if (this.commentContent[acc as number] === "") {
			return;
		}

		const comment: CommentAboutHost = {
			rating: this.ratings[acc as number],
			content: this.commentContent[acc as number],
			guestId: this.authService.getId(),
			hostId: host
		}

		this.commentsService.createCommentAboutHost(comment).subscribe({
			next: (createdComm) => {
				console.log(createdComm);
				this.commentContent[acc as number] = '';
				this.getCommentsAboutHost();
			},
			error: (error) => {
				console.error("Error creating comment:", error);
			}
		});

		console.log("Host: ", host);
		console.log("Guest: ", this.authService.getId());
		// console.log("Rating: ", this.rating);
		// console.log("Content: ", this.commentContent);
	}

	deleteComment(commentId: number | undefined): void {
		this.commentsService.deleteCommentAboutHost(commentId as number).subscribe({
			next: (deletedComm) => {
				console.log(deletedComm);
				this.getCommentsAboutHost();
			},
			error: (error) => {
				console.error("Error deleting comment:", error);
			}
		});
	}
}
