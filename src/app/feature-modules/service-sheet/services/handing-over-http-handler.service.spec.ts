import { TestBed } from '@angular/core/testing';

import { HandingOverHttpHandlerService } from './handing-over-http-handler.service';

describe('HandingOverHttpHandlerService', () => {
  let service: HandingOverHttpHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandingOverHttpHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
