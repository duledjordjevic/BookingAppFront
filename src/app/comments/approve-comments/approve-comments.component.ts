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
import {environment} from "../../../env/env";
import {Accommodation} from "../../accommodation/model/accommodation.model";
import {CommentAboutAcc} from "../model/comment-about-acc-model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommentsService} from "../services/comments.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../infrastructure/auth/services/auth.service";
import {CommentAboutHost} from "../model/comment-about-host.model";

@Component({
  selector: 'app-approve-comments',
  templateUrl: './approve-comments.component.html',
  styleUrls: ['./approve-comments.component.css']
})
export class ApproveCommentsComponent {

	@Input() color: ThemePalette = 'accent';
	@Input('starCount') starCount: number = 5;

	@Input('rating') rating: number = 1;
	@Output() ratingUpdated = new EventEmitter();

	@ViewChild('matButton', { static: true }) matButton!: ElementRef;

	ratingArr: number[] = [];
	ratings: { [key: number]: number } = {};

	imageBase64:string = environment.imageBase64;
	accommodations: Accommodation[] = [];
	commentsForApproving: CommentAboutAcc[] = [];
	haveCommentsForDisplay: boolean = true;

	constructor(private renderer: Renderer2, private commentsService: CommentsService) { }

	ngOnInit() {
		for (let index = 0; index < this.starCount; index++) {
			this.ratingArr.push(index);
		}

		this.getCommentsForApproving();
	}

	getCommentsForApproving(): void {
		this.commentsService.getCommentsForApproving().subscribe( {
			next:(result: CommentAboutHost[]) =>{
				this.commentsForApproving = result;
				if(this.commentsForApproving.length == 0){
					this.haveCommentsForDisplay = false;
				}
				this.commentsForApproving.forEach(com => {
					this.ratings[com.id as number] = 1;
				});
				console.log(this.commentsForApproving);
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

	approveComment(commentId?: number ): void {
		this.commentsService.approveCommentAboutAcc(commentId as number, true).subscribe({
			next: () => {
				this.getCommentsForApproving();
				console.log("Uspesno approvovanje komentara");
			},
			error: () => {
				console.log("Error approving comment");
			}
		})
	}
	deleteComment(commentId: number | undefined): void {
		this.commentsService.deleteCommentAboutAcc(commentId as number).subscribe({
			next: (deletedComm) => {
				console.log(deletedComm);
				this.getCommentsForApproving();
			},
			error: (error) => {
				console.error("Error deleting comment:", error);
			}
		});
	}
}
