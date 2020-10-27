import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelIconButtonComponent } from './label-icon-button.component';

describe('LabelIconButtonComponent', () => {
  let component: LabelIconButtonComponent;
  let fixture: ComponentFixture<LabelIconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelIconButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelIconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
