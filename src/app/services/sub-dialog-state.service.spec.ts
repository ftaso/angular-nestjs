import { TestBed } from '@angular/core/testing';

import { SubDialogStateService } from './sub-dialog-state.service';

describe('SubDialogStateService', () => {
  let service: SubDialogStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubDialogStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
