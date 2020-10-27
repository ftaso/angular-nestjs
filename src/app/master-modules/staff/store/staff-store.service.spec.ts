import { TestBed } from '@angular/core/testing';

import { StaffStoreService } from './staff-store.service';

describe('StaffStoreService', () => {
  let service: StaffStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
