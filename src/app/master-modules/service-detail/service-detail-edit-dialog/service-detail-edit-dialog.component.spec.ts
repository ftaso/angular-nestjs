import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailEditDialogComponent } from './service-detail-edit-dialog.component';

describe('ServiceDetailEditDialogComponent', () => {
  let component: ServiceDetailEditDialogComponent;
  let fixture: ComponentFixture<ServiceDetailEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDetailEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetailEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
