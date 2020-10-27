import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeFixedServiceComponent } from './time-fixed-service.component';

describe('TimeFixedServiceComponent', () => {
  let component: TimeFixedServiceComponent;
  let fixture: ComponentFixture<TimeFixedServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeFixedServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeFixedServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
