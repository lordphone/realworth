import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-number-input-group',
  templateUrl: './number-input-group.component.html',
  styleUrls: ['./number-input-group.component.css'],
  imports: [NgClass, NgIf, ReactiveFormsModule],
})

export class NumberInputGroupComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      amountInput: [0, [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  get amountInput() {
    return this.form.get('amountInput') as FormControl;
  }

  get validInput() {
    return this.amountInput.valid;
  }
}