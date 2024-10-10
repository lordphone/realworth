import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasingPowerComponent } from './purchasing-power.component';

describe('PurchasingPowerComponent', () => {
  let component: PurchasingPowerComponent;
  let fixture: ComponentFixture<PurchasingPowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchasingPowerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchasingPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
