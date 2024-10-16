import { Component } from '@angular/core';
import { AreaService } from '../services/area.service';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';


@Component({
  selector: 'app-select-menu',
  templateUrl: './select-menu.component.html',
  styleUrls: ['./select-menu.component.css'],
  standalone: true,
  imports: [FormsModule, NgForOf]
})
export class SelectMenuComponent {
  areas: string[] = ['Area 1', 'Area 2', 'Area 3'];
  selectedArea: string = '';

  constructor(private areaService: AreaService) { }

  ngOnInit() {
    this.loadAreas();
  }

  loadAreas() {
    this.areaService.getAreas().subscribe({
      next: data => {
        this.areas = data;
        if (this.areas.includes('United States')) {
          this.selectedArea = 'United States';
        }
      },
      error: err => {
        console.error('Error fetching areas: ', err);
      }
    });
  }

  onAreaChange(area: string) {
    this.selectedArea = area;
    // preform area update
  }
}
