import { Component } from '@angular/core';
import {NgxDropzoneChangeEvent} from "ngx-dropzone";

@Component({
  selector: 'app-accommodation-picture-upload',
  templateUrl: './accommodation-picture-upload.component.html',
  styleUrls: ['./accommodation-picture-upload.component.css']
})
export class AccommodationPictureUploadComponent {

	files: File[] = [];
	imagePreviews: string[] = [];

	onDrop(event: NgxDropzoneChangeEvent): void {
		if (event.addedFiles) {
			const fileArray = Array.from(event.addedFiles);
			this.handleFiles(fileArray);
		}
	}

	onSelect(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.files) {
			const fileArray = Array.from(input.files);
			this.handleFiles(fileArray);
		}
	}

	private handleFiles(files: File[]): void {
		for (let i = 0; i < files.length; i++) {
			this.files.push(files[i]);
			this.generateImagePreview(files[i]);
		}
	}

	private generateImagePreview(file: File): void {
		const reader = new FileReader();

		reader.onload = (event: ProgressEvent<FileReader>) => {
			if (event.target && event.target.result) {
				this.imagePreviews.push(event.target.result as string);
			}
		};

		reader.readAsDataURL(file);
	}

	deleteImage(index: number): void {
		this.files.splice(index, 1);
		this.imagePreviews.splice(index, 1);
	}


}
