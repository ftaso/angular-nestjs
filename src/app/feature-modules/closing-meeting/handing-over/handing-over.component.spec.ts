import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandingOverComponent } from './handing-over.component';

describe('HandingOverComponent', () => {
  let component: HandingOverComponent;
  let fixture: ComponentFixture<HandingOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandingOverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandingOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
