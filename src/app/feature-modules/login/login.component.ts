import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStaffData } from '../../class/staff';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../store/session.service';
import { DialogStateService } from '../../services/dialog-state.service';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { PopUpComponent } from '../../core/pop-up/pop-up.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() loginStaffData: LoginStaffData;
  @Output() loginFlag = new EventEmitter();

  public formGroup = new FormGroup({
    accountName: new FormControl('', [
      Validators.required, // 必須
    ]),
    password: new FormControl('', [
      Validators.required,
    ])
  });

  hide = true;
  public model: any = {
    accountName: '',
    password: ''
  };

  constructor(
    protected router: Router,
    private authService: AuthService,
    private sessionService: SessionService,
    protected dialogStateService: DialogStateService,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.authService.login(this.model.accountName, this.model.password).subscribe(
      data => {
        this.loginStaffData = data;
      }, error => {
        if (error.status === 404) {
          this.openAlertPopUp
          (`<p>エラー：アカウントが見つかりません。</p>アカウント名をご確認の上、再度ログインしてください。`);
        } else if (error.status === 401) {
          this.openAlertPopUp
          (`<p>エラー：認証に失敗しました。</p>パスワードをご確認の上再度ログインしてください。`);
        }
      });
  }

  openAlertPopUp(message: string): void {
    const params = {
      class: 'pop-up',
      contents: message
    };
    this.dialogStateService.openDialog(PopUpComponent, this.viewContainerRef, params);
  }

}
