import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exchange-rate',
  standalone: true,
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent {
  @Input() baseCurrency: string = 'USD';
  @Input() targetCurrency: string = 'CNY';
  @Input() baseRate: number = 1;
  @Input() targetRate: number = 7.2;
  @Input() timeStamp: string = '2024-11-14T00:00:00';

  time = new Date(this.timeStamp).toLocaleString();

  rate: number = 7.2;

  ngOnChanges() {
    this.updateRate();
    this.updateTime();
  }

  updateTime() {
    this.time = new Date(this.timeStamp).toLocaleString();
  }

  updateRate() {
    this.rate = parseFloat((this.targetRate / this.baseRate).toFixed(2));
  }
}
