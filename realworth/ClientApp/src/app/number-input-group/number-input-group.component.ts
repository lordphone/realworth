import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
      // Ensure the input is numeric and not empty
      amount: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  get validInput(): boolean {
    // Return the form control's validity or false if undefined
    return this.form.get('amount')?.valid ?? true;
  }
}