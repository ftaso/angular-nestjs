import { TestBed } from '@angular/core/testing';

import { PasswordChangeHttpHandlerService } from './password-change-http-handler.service';

describe('PasswordChangeHttpHandlerService', () => {
  let service: PasswordChangeHttpHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordChangeHttpHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
