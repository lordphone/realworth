import { Component } from '@angular/core';
import { FetchDataComponent } from '../fetch-data/fetch-data.component';

@Component({
  selector: 'app-world-income-map',
  standalone: true,
  imports: [FetchDataComponent],
  templateUrl: './world-income-map.component.html',
  styleUrls: ['./world-income-map.component.css']
})
export class WorldIncomeMapComponent {

}
