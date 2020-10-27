import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealTypeComponent } from './meal-type.component';

describe('MealTypeComponent', () => {
  let component: MealTypeComponent;
  let fixture: ComponentFixture<MealTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
