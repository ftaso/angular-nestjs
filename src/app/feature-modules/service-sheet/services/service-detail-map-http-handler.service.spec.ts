import { TestBed } from '@angular/core/testing';

import { ServiceDetailMapHttpHandlerService } from './service-detail-map-http-handler.service';

describe('ServiceDetailMapHttpHandlerService', () => {
  let service: ServiceDetailMapHttpHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDetailMapHttpHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
