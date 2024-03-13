import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { FetchDataComponent } from './app/fetch-data/fetch-data.component';
import { CounterComponent } from './app/counter/counter.component';
import { HomeComponent } from './app/home/home.component';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}


const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }), FormsModule),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
        ])
    ]
})
  .catch(err => console.log(err));

