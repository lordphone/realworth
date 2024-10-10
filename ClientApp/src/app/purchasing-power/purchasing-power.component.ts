import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectMenuComponent } from '../select-menu/select-menu.component';
import { NumberInputGroupComponent } from '../number-input-group/number-input-group.component';

@Component({
  selector: 'app-purchasing-power',
  standalone: true,
  imports: [FormsModule, CommonModule, SelectMenuComponent, NumberInputGroupComponent],
  templateUrl: './purchasing-power.component.html',
  styleUrls: ['./purchasing-power.component.css']
})
export class PurchasingPowerComponent {
  // country list, fetch later from API
  countries = ['USA', 'India', 'Canada', 'China'];
  selectedCountry: string;

  // default countries
  left = {
    country: 'USA',
    amount: 0,
    convertedAmount: 0
  };
  right = {
    country: 'China',
    amount: 0,
    convertedAmount: 0
  };

  // probably for api later?
  constructor() {
    this.selectedCountry = this.countries[0];
  }

  convertPPP(side: 'left' | 'right'): void {
    // Implement conversion logic here
    // This is a placeholder logic, replace it with actual PPP conversion
    const conversionRate = 1.2; // Placeholder conversion rate
    if (side === 'left') {
      this.left.convertedAmount = this.left.amount * conversionRate;
    } else {
      this.right.convertedAmount = this.right.amount * conversionRate;
    }
  }

}
