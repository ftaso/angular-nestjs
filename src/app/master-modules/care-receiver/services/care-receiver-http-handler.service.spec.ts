import { TestBed } from '@angular/core/testing';

import { CareReceiverHttpHandlerService } from './care-receiver-http-handler.service';

describe('CareReceiverHttpHandlerService', () => {
  let service: CareReceiverHttpHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareReceiverHttpHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
