import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface ExchangePppRate {
    id: number;
    area: string;
    currency_name: string;
    currency_code: string;
    ppp_rate: number;
    exchange_rate: number;
    timestamp: string;
}

@Injectable({
    providedIn: "root",
})
export class ExchangePppRateService {
    private apiUrl = "/api/ExchangePppRates";
    constructor(private http: HttpClient) {}

    getExchangePppRates(): Observable<ExchangePppRate[]> {
        return this.http.get<ExchangePppRate[]>(this.apiUrl);
    }
}