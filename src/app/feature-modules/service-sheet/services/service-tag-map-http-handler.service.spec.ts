import { TestBed } from '@angular/core/testing';

import { ServiceTagMapHttpHandlerService } from './service-tag-map-http-handler.service';

describe('ServiceTagMapHttpHandlerService', () => {
  let service: ServiceTagMapHttpHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTagMapHttpHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
