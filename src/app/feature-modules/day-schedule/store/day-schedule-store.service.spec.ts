import { TestBed } from '@angular/core/testing';

import { DayScheduleStoreService } from './day-schedule-store.service';

describe('DayScheduleStoreService', () => {
  let service: DayScheduleStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayScheduleStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
