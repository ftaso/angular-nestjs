import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputStaffChangeComponent } from './input-staff-change.component';

describe('InputStaffChangeComponent', () => {
  let component: InputStaffChangeComponent;
  let fixture: ComponentFixture<InputStaffChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputStaffChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputStaffChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
