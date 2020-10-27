import { TestBed } from '@angular/core/testing';

import { PopUpStateService } from './pop-up-state.service';

describe('PopUpStateService', () => {
  let service: PopUpStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
