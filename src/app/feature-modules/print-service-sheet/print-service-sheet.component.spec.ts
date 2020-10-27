import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintServiceSheetComponent } from './print-service-sheet.component';

describe('PrintServiceSheetComponent', () => {
  let component: PrintServiceSheetComponent;
  let fixture: ComponentFixture<PrintServiceSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintServiceSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintServiceSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
