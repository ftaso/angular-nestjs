import { TestBed } from '@angular/core/testing';

import { HydrationStoreService } from './hydration-store.service';

describe('HydrationStoreService', () => {
  let service: HydrationStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HydrationStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
