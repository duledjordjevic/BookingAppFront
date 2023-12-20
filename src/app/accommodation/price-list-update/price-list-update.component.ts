import {Component, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { IntervalPrice } from '../model/interval-price.model';
import { AccommodationService } from '../services/accommodation.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-price-list-update',
	templateUrl: './price-list-update.component.html',
	styleUrls: ['./price-list-update.component.css']
})
export class PriceListUpdateComponent {
	@Output() priceListObject: EventEmitter<any> = new EventEmitter();

	form: FormGroup;
	data: IntervalPrice[] = [];
	dateValidation: boolean = false;
	// currentId: number = 1;

	constructor(private fb: FormBuilder, private accommodationService: AccommodationService,
				private route: ActivatedRoute,
				private http: HttpClient) {
		this.form = this.fb.group({
			startDate: [new Date(), Validators.required],
			endDate: [new Date(), Validators.required],
			price: [0, Validators.required]
		});
	}

	sendObject() {
		this.priceListObject.emit(this.data);
	}

	accommodationId: number = 0;

	ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
			console.log(params);
			this.accommodationId = params['id'];
		});

		this.getIntervals();
	}

	getIntervals(): void {
		this.accommodationService.getIntervals(this.accommodationId).subscribe({
			next: (intervalPrices: IntervalPrice[]) => {
				console.log('OVOO sam primio', intervalPrices);

				// Čišćenje niza pre dodavanja novih slika
				this.data = [];

				this.data = intervalPrices;
				this.data.forEach((interval, index) => {
					// this.data.push(interval);
					console.log(interval);
				});

			},
			error: (error) => {
				console.error('Error fetching accommodation data:', error);
			}
		});
	}
	addRow() {
		this.dateValidation = false;
		this.setCustomValidators();

		if (this.form.valid) {
			const newRow: IntervalPrice = {
				startDate: this.form.value.startDate,
				endDate: this.form.value.endDate,
				price: this.form.value.price
			};

			// Dodajte novi red
			this.data.push(newRow);

			// Resetujte formu
			this.form.reset();
		} else {
			this.dateValidation = true;
		}
	}



	selectedRowIndexes: number[] = [];


	selectRow(index: number): void {

		const selectedIndex = this.selectedRowIndexes.indexOf(index);

		if (selectedIndex === -1) {

			this.selectedRowIndexes.push(index);
		} else {

			this.selectedRowIndexes.splice(selectedIndex, 1);
		}
	}


	isRowSelected(index: number): boolean {
		return this.selectedRowIndexes.indexOf(index) !== -1;
	}


	deleteSelectedRows(): void {
		if (this.selectedRowIndexes.length > 0) {
			const sortedIndexes = this.selectedRowIndexes.sort((a, b) => b - a);

			sortedIndexes.forEach((index) => {
				this.data.splice(index, 1);
			});

			// this.resetCurrentId();
			this.selectedRowIndexes = [];
		}
	}

	setCustomValidators() {
		this.form.setValidators(this.dateValidator.bind(this));
		this.form.updateValueAndValidity();
	}

	dateValidator(control: AbstractControl): ValidationErrors | null {
		const startDate = control.get('startDate')?.value;
		const endDate = control.get('endDate')?.value;

		if (startDate && endDate && startDate > endDate) {
			return { 'dateError': true, 'message': 'End date must be greater than start date.' };
		}

		if (startDate && startDate < new Date()) {
			return { 'dateError': true, 'message': 'Start date must be in the future.' };
		}

		return null;
	}

}
