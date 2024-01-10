import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentHostComponent } from './comment-host/comment-host.component';
import {MaterialModule} from "../infrastructure/material/material.module";

@NgModule({
  declarations: [
    CommentHostComponent
  ],
	imports: [
		CommonModule,
		MaterialModule,
	],
	exports: [
		CommentHostComponent,
	]
})
export class CommentsModule { }
