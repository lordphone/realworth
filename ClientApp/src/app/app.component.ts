import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { WorldIncomeMapComponent } from './world-income-map/world-income-map.component';
import { PurchasingPowerComponent } from './purchasing-power/purchasing-power.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [CommonModule, NgIf, NavigationBarComponent, RouterOutlet, RouterLink, RouterLinkActive, WorldIncomeMapComponent, PurchasingPowerComponent],
})
export class AppComponent {
  title = 'realworth';

  showPPP = true;
  showMap = false;

  handleShowPPPChange(showPPP: boolean): void {
    this.showPPP = showPPP;
  }

  handleShowMapChange(showMap: boolean): void {
    this.showMap = showMap;
  }
}

