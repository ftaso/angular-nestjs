import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTagEditDialogComponent } from './service-tag-edit-dialog.component';

describe('ServiceTagEditDialogComponent', () => {
  let component: ServiceTagEditDialogComponent;
  let fixture: ComponentFixture<ServiceTagEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceTagEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTagEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
