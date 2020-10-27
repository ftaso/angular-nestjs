import { TestBed } from '@angular/core/testing';

import { RecordHttpHandlerService } from './record-http-handler.service';

describe('RecordHttpHandlerService', () => {
  let service: RecordHttpHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordHttpHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
