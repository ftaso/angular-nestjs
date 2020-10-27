import { TestBed } from '@angular/core/testing';

import { ServiceDetailStoreService } from './service-detail-store.service';

describe('ServiceDetailStoreService', () => {
  let service: ServiceDetailStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDetailStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
