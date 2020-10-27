import { TestBed } from '@angular/core/testing';

import { ExcretionStoreService } from './excretion-store.service';

describe('ExcretionStoreService', () => {
  let service: ExcretionStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcretionStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
