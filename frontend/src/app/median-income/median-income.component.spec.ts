import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedianIncomeComponent } from './median-income.component';

describe('MedianIncomeComponent', () => {
  let component: MedianIncomeComponent;
  let fixture: ComponentFixture<MedianIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedianIncomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedianIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
