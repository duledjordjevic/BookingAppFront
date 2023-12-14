import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
interface DataRow {
	rowNumber: number;
	startDate: Date;
	endDate: Date;
	price: number;
}
@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent {

	form: FormGroup;
	data: DataRow[] = [];
	currentId: number = 1;

	constructor(private fb: FormBuilder) {
		this.form = this.fb.group({
			startDate: [null, Validators.required],
			endDate: [null, Validators.required],
			price: [null, Validators.required]
		});
	}

	addRow() {
		if (this.form.valid) {
			const newRow: DataRow = {
				rowNumber: this.currentId++,
				startDate: this.form.value.startDate,
				endDate: this.form.value.endDate,
				price: this.form.value.price
			};

			// Dodajte novi red
			this.data.push(newRow);

			// Resetujte formu
			this.form.reset();
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

			this.resetCurrentId();
			this.selectedRowIndexes = [];
		}
	}

	resetCurrentId(): void {
		const maxId = Math.max(...this.data.map(item => item.rowNumber), 0);
		this.currentId = maxId + 1;
	}

}
