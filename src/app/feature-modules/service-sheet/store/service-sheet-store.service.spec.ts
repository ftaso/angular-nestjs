import { TestBed } from '@angular/core/testing';

import { ServiceSheetStoreService } from './service-sheet-store.service';

describe('ServiceSheetStoreService', () => {
  let service: ServiceSheetStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceSheetStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
