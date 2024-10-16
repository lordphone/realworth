import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
    private apiURL = '/api/Areas';
    constructor(private http: HttpClient) { }
    getAreas(): Observable<string[]> {
        return this.http.get<string[]>(this.apiURL);
    }
}