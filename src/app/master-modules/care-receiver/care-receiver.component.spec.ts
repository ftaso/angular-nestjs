import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareReceiverComponent } from './care-receiver.component';

describe('CareReceiverComponent', () => {
  let component: CareReceiverComponent;
  let fixture: ComponentFixture<CareReceiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareReceiverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareReceiverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
