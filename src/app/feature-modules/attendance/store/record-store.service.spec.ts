import { TestBed } from '@angular/core/testing';

import { RecordStoreService } from './record-store.service';

describe('RecordStoreService', () => {
  let service: RecordStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
