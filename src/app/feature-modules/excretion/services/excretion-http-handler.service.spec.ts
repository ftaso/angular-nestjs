import { TestBed } from '@angular/core/testing';

import { ExcretionHttpHandlerService } from './excretion-http-handler.service';

describe('ExcretionHttpHandlerService', () => {
  let service: ExcretionHttpHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcretionHttpHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
