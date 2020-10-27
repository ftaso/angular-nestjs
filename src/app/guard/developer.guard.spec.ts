import { TestBed } from '@angular/core/testing';

import { DeveloperGuard } from './developer.guard';

describe('DeveloperGuard', () => {
  let guard: DeveloperGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DeveloperGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
