import { TestBed } from '@angular/core/testing';

import { CareReceiverStoreService } from './care-receiver-store.service';

describe('CareReceiverStoreService', () => {
  let service: CareReceiverStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CareReceiverStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
