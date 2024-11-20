import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectMenuComponent } from '../select-menu/select-menu.component';
import { NumberInputGroupComponent } from '../number-input-group/number-input-group.component';
import { ExchangePppRateService, ExchangePppRate } from '../services/exchange-ppp-rate.service';
import { ExchangeRateComponent } from '../exchange-rate/exchange-rate.component';
import { MedianIncomeComponent } from '../median-income/median-income.component';

@Component({
  selector: 'app-purchasing-power',
  standalone: true,
  imports: [FormsModule, CommonModule, SelectMenuComponent, NumberInputGroupComponent, ExchangeRateComponent, MedianIncomeComponent],
  templateUrl: './purchasing-power.component.html',
  styleUrls: ['./purchasing-power.component.css']
})
export class PurchasingPowerComponent implements OnInit {
  // data from backend
  exchangePppRates: ExchangePppRate[] = [];

  timeStamp: string = '11/13/2024 23:35:00';

  topArea: string = 'United States';
  topAreaId: number = 38;
  topAmount: number = 0;
  topCurrencyName: string[] = ['US dollars'];
  topCurrencyCode: string = 'USD';
  topExchangeRate: number = 1;
  topMedianIncome: number = 62400;
  topMedianYear: number = 2022;

  bottomArea: string = 'China (People\'s Republic of)';
  bottomAreaId: number = 47;
  bottomAmount: number = 0;
  bottomCurrencyName: string[] = ['Chinese yuan'];
  bottomCurrencyCode: string = 'CNY';
  bottomExchangeRate: number = 7.2;
  bottomMedianIncome: number = 87341.93;
  bottomMedianYear: number = 2021;
  
  constructor(private exchangePppRateService: ExchangePppRateService) { }

  ngOnInit() {
    this.loadExchangePppRates();
  }

  loadExchangePppRates() {
    this.exchangePppRateService.getExchangePppRates().subscribe({
      next: data => {
        data.sort((a, b) => a.area.localeCompare(b.area));
        this.exchangePppRates = data;
        this.timeStamp = data[0].timestamp;
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
    this.topExchangeRate = this.exchangePppRates.find(rate => rate.area === area)?.exchange_rate || 1;
    this.topCurrencyCode = this.exchangePppRates.find(rate => rate.area === area)?.currency_code || 'USD';
    this.topMedianIncome = parseFloat((parseFloat(this.medianIncomeData.find(rate => rate.id === this.topAreaId)?.median || '0') * this.topExchangeRate * 2080).toFixed(2));
    this.topMedianYear = parseInt(this.medianIncomeData.find(rate => rate.id === this.topAreaId)?.Year || '2022');
  }

  onBottomAreaChange(area: string) {
    this.bottomArea = area;
    this.bottomAreaId = this.exchangePppRates.find(rate => rate.area === area)?.id || 47;
    this.bottomCurrencyName[0] = this.exchangePppRates.find(rate => rate.area === area)?.currency_name || 'Not Found';
    this.bottomAmount = this.convertAmount(this.topAmount, this.topAreaId, this.bottomAreaId);
    this.bottomExchangeRate = this.exchangePppRates.find(rate => rate.area === area)?.exchange_rate || 1;
    this.bottomCurrencyCode = this.exchangePppRates.find(rate => rate.area === area)?.currency_code || 'CNY';
    this.bottomMedianIncome = parseFloat((parseFloat(this.medianIncomeData.find(rate => rate.id === this.bottomAreaId)?.median || '0') * this.bottomExchangeRate * 2080).toFixed(2));
    this.bottomMedianYear = parseInt(this.medianIncomeData.find(rate => rate.id === this.bottomAreaId)?.Year || '2021');
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
  medianIncomeData = [
    { id: 1, area: "Australia", Year: "2018", median: "25.50" },
    { id: 2, area: "Austria", Year: "2021", median: "28.00" },
    { id: 3, area: "Belgium", Year: "2021", median: "26.20" },
    { id: 4, area: "Canada", Year: "2019", median: "27.10" },
    { id: 5, area: "Chile", Year: "2022", median: "9.60" },
    { id: 6, area: "Colombia", Year: "2022", median: "4.65" },
    { id: 7, area: "Costa Rica", Year: "2023", median: "8.30" },
    { id: 8, area: "Czechia", Year: "2021", median: "17.65" },
    { id: 9, area: "Denmark", Year: "2021", median: "27.45" },
    { id: 10, area: "Estonia", Year: "2021", median: "19.25" },
    { id: 11, area: "Finland", Year: "2021", median: "24.90" },
    { id: 12, area: "France", Year: "2021", median: "23.90" },
    { id: 13, area: "Germany", Year: "2020", median: "28.55" },
    { id: 14, area: "Greece", Year: "2021", median: "12.70" },
    { id: 15, area: "Hungary", Year: "2021", median: "13.85" },
    { id: 16, area: "Iceland", Year: "2017", median: "27.20" },
    { id: 17, area: "Ireland", Year: "2021", median: "24.10" },
    { id: 18, area: "Israel", Year: "2021", median: "15.80" },
    { id: 19, area: "Italy", Year: "2021", median: "20.85" },
    { id: 20, area: "Japan", Year: "2013", median: "19.95" },
    { id: 21, area: "Korea", Year: "2021", median: "16.85" },
    { id: 22, area: "Latvia", Year: "2021", median: "14.80" },
    { id: 23, area: "Lithuania", Year: "2021", median: "16.80" },
    { id: 24, area: "Luxembourg", Year: "2021", median: "38.30" },
    { id: 25, area: "Mexico", Year: "2022", median: "5.60" },
    { id: 26, area: "Netherlands", Year: "2021", median: "28.75" },
    { id: 27, area: "New Zealand", Year: "2024", median: "15.20" },
    { id: 28, area: "Norway", Year: "2019", median: "31.40" },
    { id: 29, area: "Poland", Year: "2021", median: "16.30" },
    { id: 30, area: "Portugal", Year: "2021", median: "14.05" },
    { id: 31, area: "Slovak Republic", Year: "2022", median: "3.70" },
    { id: 32, area: "Slovenia", Year: "2021", median: "20.85" },
    { id: 33, area: "Spain", Year: "2021", median: "19.90" },
    { id: 34, area: "Sweden", Year: "2021", median: "24.75" },
    { id: 35, area: "Switzerland", Year: "2020", median: "31.65" },
    { id: 36, area: "Türkiye", Year: "2023", median: "1.30" },
    { id: 37, area: "United Kingdom", Year: "2021", median: "22.50" },
    { id: 38, area: "United States", Year: "2022", median: "30.00" },
    { id: 39, area: "Euro area", Year: "2024", median: "10.00" },
    { id: 40, area: "European Union", Year: "2023", median: "16.20" },
    { id: 41, area: "Albania", Year: "2020", median: "5.80" },
    { id: 42, area: "Argentina", Year: "2022", median: "1.40" },
    { id: 43, area: "Brazil", Year: "2022", median: "6.25" },
    { id: 44, area: "Bulgaria", Year: "2021", median: "11.25" },
    { id: 45, area: "Cabo Verde", Year: "2024", median: "4.65" },
    { id: 46, area: "Cameroon", Year: "2021", median: "1.88" },
    { id: 47, area: "China (People's Republic of)", Year: "2021", median: "5.80" },
    { id: 48, area: "Croatia", Year: "2021", median: "13.80" },
    { id: 49, area: "Cyprus", Year: "2021", median: "22.00" },
    { id: 50, area: "Georgia", Year: "2022", median: "3.40" },
    { id: 51, area: "Hong Kong (China)", Year: "2023", median: "6.90" },
    { id: 52, area: "India", Year: "2021", median: "1.90" },
    { id: 53, area: "Indonesia", Year: "2023", median: "2.80" },
    { id: 54, area: "Madagascar", Year: "2012", median: "0.54" },
    { id: 55, area: "Malta", Year: "2020", median: "23.10" },
    { id: 56, area: "Morocco", Year: "2013", median: "3.70" },
    { id: 57, area: "North Macedonia", Year: "2019", median: "6.50" },
    { id: 58, area: "Romania", Year: "2021", median: "11.15" },
    { id: 59, area: "Russia", Year: "2020", median: "8.40" },
    { id: 60, area: "Saudi Arabia", Year: "2023", median: "9.25" },
    { id: 61, area: "Senegal", Year: "2021", median: "2.10" },
    { id: 62, area: "Serbia", Year: "2021", median: "8.15" },
    { id: 63, area: "Singapore", Year: "2023", median: "14.50" },
    { id: 64, area: "South Africa", Year: "2014", median: "2.25" },
    { id: 65, area: "Zambia", Year: "2022", median: "0.70" },
  ];
}
