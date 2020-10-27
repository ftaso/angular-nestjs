import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberInputerComponent } from './number-inputer.component';

describe('NumberInputerComponent', () => {
  let component: NumberInputerComponent;
  let fixture: ComponentFixture<NumberInputerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberInputerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberInputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
