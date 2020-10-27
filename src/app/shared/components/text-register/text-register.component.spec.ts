import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextRegisterComponent } from './text-register.component';

describe('TextRegisterComponent', () => {
  let component: TextRegisterComponent;
  let fixture: ComponentFixture<TextRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
