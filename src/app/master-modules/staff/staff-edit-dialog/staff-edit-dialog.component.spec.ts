import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffEditDialogComponent } from './staff-edit-dialog.component';

describe('StaffEditDialogComponent', () => {
  let component: StaffEditDialogComponent;
  let fixture: ComponentFixture<StaffEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
