import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [NavigationBarComponent, RouterOutlet, RouterLink, RouterLinkActive]
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

