import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareReceiverRegistDialogComponent } from './care-receiver-regist-dialog.component';

describe('RegistDialogComponent', () => {
  let component: CareReceiverRegistDialogComponent;
  let fixture: ComponentFixture<CareReceiverRegistDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareReceiverRegistDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareReceiverRegistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
