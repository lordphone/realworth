import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldIncomeMapComponent } from './world-income-map.component';

describe('WorldIncomeMapComponent', () => {
  let component: WorldIncomeMapComponent;
  let fixture: ComponentFixture<WorldIncomeMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorldIncomeMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorldIncomeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
