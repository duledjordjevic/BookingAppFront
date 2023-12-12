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
				rowNumber: this.data.length + 1,
				startDate: this.form.value.startDate,
				endDate: this.form.value.endDate,
				price: this.form.value.price
			};

			this.data.push(newRow);
			this.form.reset();
		}
	}
}
