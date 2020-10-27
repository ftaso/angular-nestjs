import { TestBed } from '@angular/core/testing';

import { DayScheduleHttpHandlerService } from './day-schedule-http-handler.service';

describe('DayScheduleHttpHandlerService', () => {
  let service: DayScheduleHttpHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayScheduleHttpHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
