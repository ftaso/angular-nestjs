import { TestBed } from '@angular/core/testing';

import { MealHttpHandlerService } from './meal-http-handler.service';

describe('MealHttpHandlerService', () => {
  let service: MealHttpHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealHttpHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
