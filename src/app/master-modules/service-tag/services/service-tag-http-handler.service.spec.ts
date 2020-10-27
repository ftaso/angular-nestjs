import { TestBed } from '@angular/core/testing';

import { ServiceTagHttpHandlerService } from './service-tag-http-handler.service';

describe('ServiceTagHttpHandlerService', () => {
  let service: ServiceTagHttpHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTagHttpHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
