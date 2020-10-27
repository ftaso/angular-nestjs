import { TestBed } from '@angular/core/testing';

import { TimeFixedServiceHttpHandlerService } from './time-fixed-service-http-handler.service';

describe('TimeFixedServiceHttpHandlerService', () => {
  let service: TimeFixedServiceHttpHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeFixedServiceHttpHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
