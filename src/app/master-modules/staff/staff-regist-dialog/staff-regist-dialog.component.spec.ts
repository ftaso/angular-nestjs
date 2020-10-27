import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRegistDialogComponent } from './staff-regist-dialog.component';

describe('StaffRegistDialogComponent', () => {
  let component: StaffRegistDialogComponent;
  let fixture: ComponentFixture<StaffRegistDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffRegistDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffRegistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
