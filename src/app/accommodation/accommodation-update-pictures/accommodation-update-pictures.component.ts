import {Component, EventEmitter, Output} from '@angular/core';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { AccommodationService } from '../services/accommodation.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-accommodation-update-pictures',
	templateUrl: './accommodation-update-pictures.component.html',
	styleUrls: ['./accommodation-update-pictures.component.css']
})
export class AccommodationUpdatePicturesComponent {

	@Output() childObject: EventEmitter<any> = new EventEmitter();
	receivedImages: string[] = [];
	files: File[] = [];
	recievedFiles: File[] = [];
	imagePreviews: string[] = [];
	maxNumberOfPictures: boolean = false;

	constructor(
		private accommodationService: AccommodationService,
		private route: ActivatedRoute,
		private http: HttpClient
	) { }

	accommodationId: number = 0;

	sendObject() {
		this.childObject.emit(this.files);
	}
	ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
			console.log(params);
			this.accommodationId = params['id'];
		});

		this.getImages();
	}

	getImages(): void {
		this.accommodationService.getImages(this.accommodationId).subscribe({
			next: (listOfPictures: string[]) => {
				console.log('OVOO sam primio', listOfPictures);

				// Čišćenje niza pre dodavanja novih slika
				this.files = [];

				this.receivedImages = listOfPictures;
				this.receivedImages.forEach((pictureUrl, index) => {
					this.recievedFiles.push(this.createFileFromBase64(pictureUrl, "abc", "jpg"));
					console.log("POZVAO SAM SE");
					console.log(this.recievedFiles.length);
				});

				this.handleFiles(this.recievedFiles);
			},
			error: (error) => {
				console.error('Error fetching accommodation data:', error);
			}
		});
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
			console.log(this.files.length);
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

	base64ToUint8Array(base64String: string): Uint8Array {
		const binaryString = atob(base64String);
		const length = binaryString.length;
		const uint8Array = new Uint8Array(length);

		for (let i = 0; i < length; i++) {
			uint8Array[i] = binaryString.charCodeAt(i);
		}

		return uint8Array;
	}
	createFileFromBase64(base64String: string, fileName: string, fileType: string): File {
		const uint8Array = this.base64ToUint8Array(base64String);
		const blob = new Blob([uint8Array], { type: fileType });
		return new File([blob], fileName, { type: fileType });
	}
}
