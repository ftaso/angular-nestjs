import { TestBed } from '@angular/core/testing';

import { ServiceTypeHttpHandlerService } from './service-type-http-handler.service';

describe('ServiceTypeHttpHandlerService', () => {
  let service: ServiceTypeHttpHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTypeHttpHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
