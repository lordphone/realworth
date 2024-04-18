import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberInputGroupComponent } from './number-input-group.component';

describe('NumberInputGroupComponent', () => {
  let component: NumberInputGroupComponent;
  let fixture: ComponentFixture<NumberInputGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberInputGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberInputGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
