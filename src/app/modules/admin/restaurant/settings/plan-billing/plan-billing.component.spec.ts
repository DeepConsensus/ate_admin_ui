import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanBillingComponent } from './plan-billing.component';

describe('PlanBillingComponent', () => {
  let component: PlanBillingComponent;
  let fixture: ComponentFixture<PlanBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanBillingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
