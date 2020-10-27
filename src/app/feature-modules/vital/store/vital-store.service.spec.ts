import { TestBed } from '@angular/core/testing';

import { VitalStoreService } from './vital-store.service';

describe('VitalStoreService', () => {
  let service: VitalStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VitalStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
