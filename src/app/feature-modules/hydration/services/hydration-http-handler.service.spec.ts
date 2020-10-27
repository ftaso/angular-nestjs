import { TestBed } from '@angular/core/testing';

import { HydrationHttpHandlerService } from './hydration-http-handler.service';

describe('HydrationHttpHandlerService', () => {
  let service: HydrationHttpHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HydrationHttpHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
