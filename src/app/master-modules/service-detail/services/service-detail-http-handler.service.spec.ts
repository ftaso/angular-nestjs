import { TestBed } from '@angular/core/testing';

import { ServiceDetailHttpHandlerService } from './service-detail-http-handler.service';

describe('ServiceDetailHttpHandlerService', () => {
  let service: ServiceDetailHttpHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDetailHttpHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
