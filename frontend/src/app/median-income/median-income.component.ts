import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-median-income',
  templateUrl: './median-income.component.html',
  styleUrls: ['./median-income.component.css'],
  standalone: true
})
export class MedianIncomeComponent {
  @Input() medianIncome: number = 0;
  @Input() currencyName: string = 'USD';
  @Input() timeStamp: string = '2024-11-14T00:00:00';

  time = new Date(this.timeStamp).toLocaleString();

  ngOnChanges() {
    this.updateTime();
    this.updateIncome();
  }

  updateTime() {
    this.time = new Date(this.timeStamp).toLocaleString();
  }

  updateIncome() {
    this.medianIncome = parseFloat(this.medianIncome.toFixed(2));
  }
}
