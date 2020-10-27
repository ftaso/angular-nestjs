import { TestBed } from '@angular/core/testing';

import { ServiceHttpHandlerService } from './service-http-handler.service';

describe('ServiceHttpHandlerService', () => {
  let service: ServiceHttpHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceHttpHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
