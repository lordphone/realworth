import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass, NgIf, NgForOf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-number-input-group',
  templateUrl: './number-input-group.component.html',
  styleUrls: ['./number-input-group.component.css'],
  imports: [NgClass, NgIf, ReactiveFormsModule, FormsModule],
})

export class NumberInputGroupComponent {
  @Input() id: string = '';
  @Input() amount: number = 0;
  @Output() amountChange = new EventEmitter<number>();

  // form: FormGroup;
  private userInput: boolean = false;
  validInput: boolean = true;

  // constructor(private fb: FormBuilder) {
  //   this.form = this.fb.group({
  //     amountInput: [0, [Validators.required, Validators.pattern("^[0-9]*$")]]
  //   });
  // }

  // get amountInput() {
  //   return this.form.get('amountInput') as FormControl;
  // }

  // get validInput() {
  //   console.log(this.id, this.userInput);
  //   return this.amountInput.valid;
  // }

  onAmountChange(value: string) {
    if (this.userInput) {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        this.amount = parseFloat(parsedValue.toFixed(2));
        this.amountChange.emit(this.amount);
      }
      this.userInput = false; // Reset the flag after handling user input
    }
  }

  onUserInput(event: Event) {
    this.userInput = true;
    const inputElement = event.target as HTMLInputElement;
    const parsedValue = parseFloat(inputElement.value);
    this.validInput = !isNaN(parsedValue);
    this.onAmountChange(inputElement.value);
  }
}