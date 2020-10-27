import { TestBed } from '@angular/core/testing';

import { AccountNameChangeHttpHandlerService } from './account-name-change-http-handler.service';

describe('AccountNameChangeHttpHandlerService', () => {
  let service: AccountNameChangeHttpHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountNameChangeHttpHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
