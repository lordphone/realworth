import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-fetch-data',
    templateUrl: './fetch-data.component.html',
    standalone: true,
    imports: [NgIf, NgFor],
  })

export class FetchDataComponent {
  public forecasts: WeatherForecast[] = [];

  constructor(@Inject(HttpClient) http: HttpClient, @Inject(HttpClient) baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

