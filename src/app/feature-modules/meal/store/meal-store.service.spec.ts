import { TestBed } from '@angular/core/testing';

import { MealStoreService } from './meal-store.service';

describe('MealStoreService', () => {
  let service: MealStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
