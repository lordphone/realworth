import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() id: string = '';
  @Input() areas: string[] = [];
  @Input() selectedArea: string = 'United States';
  @Output() selectedAreaChange = new EventEmitter<string>();

  label: string = 'Country / Area';

  constructor(private areaService: AreaService) { }

  ngOnInit() {
    if (this.areas.length === 1) {
      this.label = 'Currency';
      this.selectedArea = this.areas[0];
    }
  }

  onAreaChange(area: string) {
    this.selectedAreaChange.emit(area);
  }
}
