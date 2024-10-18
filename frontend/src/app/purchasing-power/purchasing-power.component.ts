import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectMenuComponent } from '../select-menu/select-menu.component';
import { NumberInputGroupComponent } from '../number-input-group/number-input-group.component';
import { ExchangePppRateService, ExchangePppRate } from '../services/exchange-ppp-rate.service';

@Component({
  selector: 'app-purchasing-power',
  standalone: true,
  imports: [FormsModule, CommonModule, SelectMenuComponent, NumberInputGroupComponent],
  templateUrl: './purchasing-power.component.html',
  styleUrls: ['./purchasing-power.component.css']
})
export class PurchasingPowerComponent implements OnInit {
  // data from backend
  exchangePppRates: ExchangePppRate[] = [];

  topArea: string = 'United States';
  topAreaId: number = 38;
  topAmount: number = 0;
  topCurrencyName: string[] = ['US dollars'];

  bottomArea: string = 'China (People\'s Republic of)';
  bottomAreaId: number = 47;
  bottomAmount: number = 0;
  bottomCurrencyName: string[] = ['Chinese yuan'];
  
  constructor(private exchangePppRateService: ExchangePppRateService) { }

  ngOnInit() {
    this.loadExchangePppRates();
  }

  loadExchangePppRates() {
    this.exchangePppRateService.getExchangePppRates().subscribe({
      next: data => {
        data.sort((a, b) => a.area.localeCompare(b.area));
        this.exchangePppRates = data;
      },
      error: err => {
        console.error('Error fetching rates: ', err);
      }
    });
  }

  onTopAreaChange(area: string) {
    this.topArea = area;
    this.topAreaId = this.exchangePppRates.find(rate => rate.area === area)?.id || 38;
    this.topCurrencyName[0] = this.exchangePppRates.find(rate => rate.area === area)?.currency_name || 'Not Found';
    this.topAmount = this.convertAmount(this.bottomAmount, this.bottomAreaId, this.topAreaId);
  }

  onBottomAreaChange(area: string) {
    this.bottomArea = area;
    this.bottomAreaId = this.exchangePppRates.find(rate => rate.area === area)?.id || 47;
    this.bottomCurrencyName[0] = this.exchangePppRates.find(rate => rate.area === area)?.currency_name || 'Not Found';
    this.bottomAmount = this.convertAmount(this.topAmount, this.topAreaId, this.bottomAreaId);
  }

  onTopAmountChange(amount: number) {
    this.topAmount = amount;
    this.bottomAmount = this.convertAmount(this.topAmount, this.topAreaId, this.bottomAreaId);
  }

  onBottomAmountChange(amount: number) {
    this.bottomAmount = amount;
    this.topAmount = this.convertAmount(this.bottomAmount, this.bottomAreaId, this.topAreaId);
  }

  convertAmount(amount: number, fromAreaId: number, toAreaId: number): number {
    const fromPppRate = this.exchangePppRates.find(rate => rate.id === fromAreaId)?.ppp_rate;
    const toPppRate = this.exchangePppRates.find(rate => rate.id === toAreaId)?.ppp_rate;
    const fromExchangeRate = this.exchangePppRates.find(rate => rate.id === fromAreaId)?.exchange_rate;
    const toExchangeRate = this.exchangePppRates.find(rate => rate.id === toAreaId)?.exchange_rate;

    if (fromPppRate && toPppRate && fromExchangeRate && toExchangeRate) {
      return parseFloat(((amount / fromPppRate) * toPppRate).toFixed(2));
    } else {
      return 0;
    }
  }

  getAreas(): string[] {
    return Array.from(new Set(this.exchangePppRates.map(rate => rate.area)));
  }

  getTopCurrency(): string[] {
    return this.topCurrencyName;
  }

  getBottomCurrency(): string[] {
    return this.bottomCurrencyName;
  }
}
