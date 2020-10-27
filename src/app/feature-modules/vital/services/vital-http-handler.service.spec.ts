import { TestBed } from '@angular/core/testing';

import { VitalHttpHandlerService } from './vital-http-handler.service';

describe('VitalHttpHandlerService', () => {
  let service: VitalHttpHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VitalHttpHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
