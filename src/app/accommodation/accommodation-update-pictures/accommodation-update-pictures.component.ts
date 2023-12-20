import { Component } from '@angular/core';
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

	receivedImages: string[] = [];
	files: File[] = [];
	imagePreviews: string[] = [];
	maxNumberOfPictures: boolean = false;

	constructor(
		private accommodationService: AccommodationService,
		private route: ActivatedRoute,
		private http: HttpClient
	) { }

	accommodationId: number = 0;

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
				this.receivedImages = listOfPictures;
				this.handleFiles(this.receivedImages);
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

	private async handleFiles(filesOrUrls: (File | string)[] | null | undefined): Promise<void> {
		if (!filesOrUrls) {
			// Ako je filesOrUrls null ili undefined, ne preduzimamo nikakve akcije
			return;
		}

		for (let i = 0; i < filesOrUrls.length; i++) {
			if (this.files.length > 9) {
				this.maxNumberOfPictures = true;
				console.log(this.files.length);
				return;
			}

			const fileOrUrl: File | string = filesOrUrls[i];

			if (typeof fileOrUrl === 'string') {
				// Ako je string, smatramo ga URL-om
				await this.generateImagePreviewFromUrl(fileOrUrl);
			} else {
				// Inače, pretpostavljamo da je File objekat
				const file: File = fileOrUrl;
				this.files.push(file);
				this.generateImagePreview(file);
			}
		}
	}

	private async generateImagePreviewFromUrl(url: string): Promise<void> {
		try {
			const blob = await this.http.get(url, { responseType: 'blob' }).toPromise();

			// Provera da li je blob null ili undefined
			if (!blob) {
				console.error('Dobijeni blob je null ili undefined.');
				return;
			}

			const reader = new FileReader();

			reader.onloadend = () => {
				if (reader.result) {
					const base64Data = reader.result as string;
					this.imagePreviews.push(base64Data);
					const file = this.dataURItoFile(base64Data, 'image.jpg');
					this.files.push(file);
				}
			};

			reader.readAsDataURL(blob);
		} catch (error) {
			console.error('Greška prilikom generisanja preview slike:', error);
		}
	}


	private dataURItoFile(dataURI: string, fileName: string): File {
		const byteString = atob(dataURI.split(',')[1]);
		const ab = new ArrayBuffer(byteString.length);
		const ia = new Uint8Array(ab);
		for (let i = 0; i < byteString.length; i++) {
			ia[i] = byteString.charCodeAt(i);
		}
		return new File([ab], fileName, { type: 'image/jpeg' });
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
