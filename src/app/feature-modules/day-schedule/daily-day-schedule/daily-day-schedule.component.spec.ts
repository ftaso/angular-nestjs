import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyDayScheduleComponent } from './daily-day-schedule.component';

describe('DailyDayScheduleComponent', () => {
  let component: DailyDayScheduleComponent;
  let fixture: ComponentFixture<DailyDayScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyDayScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyDayScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
