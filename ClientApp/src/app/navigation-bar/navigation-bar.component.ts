import { Component, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { ProfileDropdownComponent } from '../profile-dropdown/profile-dropdown.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
  imports: [ProfileDropdownComponent, NgClass],
  standalone: true
})
export class NavigationBarComponent {
  @Output() showPPPChange = new EventEmitter<boolean>();
  @Output() showMapChange = new EventEmitter<boolean>();

  showPPP = true;
  showMap = false;

  clickPPP(): void {
    this.showPPP = true;
    this.showMap = false;
    this.showPPPChange.emit(this.showPPP);
    this.showMapChange.emit(this.showMap);
  }
  clickMap(): void {
    this.showPPP = false;
    this.showMap = true;
    this.showPPPChange.emit(this.showPPP);
    this.showMapChange.emit(this.showMap);
  }
}
