import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSheetComponent } from './service-sheet.component';

describe('ServiceSheetComponent', () => {
  let component: ServiceSheetComponent;
  let fixture: ComponentFixture<ServiceSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
