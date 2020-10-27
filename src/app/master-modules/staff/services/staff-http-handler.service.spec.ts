import { TestBed } from '@angular/core/testing';

import { StaffHttpHandlerService } from './staff-http-handler.service';

describe('StaffHttpHandlerService', () => {
  let service: StaffHttpHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffHttpHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
