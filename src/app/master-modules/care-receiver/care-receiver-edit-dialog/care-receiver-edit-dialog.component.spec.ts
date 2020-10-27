import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareReceiverEditDialogComponent } from './care-receiver-edit-dialog.component';

describe('EditDialogComponent', () => {
  let component: CareReceiverEditDialogComponent;
  let fixture: ComponentFixture<CareReceiverEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareReceiverEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareReceiverEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
