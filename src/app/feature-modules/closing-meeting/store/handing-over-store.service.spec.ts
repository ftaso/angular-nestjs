import { TestBed } from '@angular/core/testing';

import { HandingOverStoreService } from './handing-over-store.service';

describe('HandingOverStoreService', () => {
  let service: HandingOverStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandingOverStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
