import { TestBed } from '@angular/core/testing';

import { ServiceSheetHttpHandlerService } from './service-sheet-http-handler.service';

describe('ServiceSheetHttpHandlerService', () => {
  let service: ServiceSheetHttpHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceSheetHttpHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
