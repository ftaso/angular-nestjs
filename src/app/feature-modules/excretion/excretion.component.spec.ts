import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcretionComponent } from './excretion.component';

describe('ExcretionComponent', () => {
  let component: ExcretionComponent;
  let fixture: ComponentFixture<ExcretionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcretionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcretionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
