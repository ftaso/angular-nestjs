import { TestBed } from '@angular/core/testing';

import { ServiceTagStoreService } from './service-tag-store.service';

describe('ServiceTagStoreService', () => {
  let service: ServiceTagStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTagStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
