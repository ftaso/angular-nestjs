import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProportionComponent } from './proportion.component';

describe('ProportionComponent', () => {
  let component: ProportionComponent;
  let fixture: ComponentFixture<ProportionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProportionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProportionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
