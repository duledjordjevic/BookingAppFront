import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgxDropzoneChangeEvent} from "ngx-dropzone";

@Component({
  selector: 'app-accommodation-picture-upload',
  templateUrl: './accommodation-picture-upload.component.html',
  styleUrls: ['./accommodation-picture-upload.component.css']
})
export class AccommodationPictureUploadComponent {

	@Output() childObject: EventEmitter<any> = new EventEmitter();
	files: File[] = [];
	imagePreviews: string[] = [];

	maxNumberOfPictures: boolean = false;

	sendObject() {
		this.childObject.emit(this.files);
	}

	onDrop(event: NgxDropzoneChangeEvent): void {
		if (event.addedFiles) {
			const fileArray = Array.from(event.addedFiles);
			this.handleFiles(fileArray);
		}
	}

	private handleFiles(files: File[]): void {
		for (let i = 0; i < files.length; i++) {
			if (this.files.length > 9){
				this.maxNumberOfPictures = true;
				console.log(this.files.length);
				return;
			}
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
