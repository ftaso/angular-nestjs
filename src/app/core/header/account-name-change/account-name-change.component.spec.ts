import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNameChangeComponent } from './account-name-change.component';

describe('AccountNameChangeComponent', () => {
  let component: AccountNameChangeComponent;
  let fixture: ComponentFixture<AccountNameChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountNameChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountNameChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
