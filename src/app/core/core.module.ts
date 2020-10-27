import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { HeaderMenuComponent } from './header/header-menu/header-menu.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { AccountNameChangeComponent } from './header/account-name-change/account-name-change.component';
import { PasswordChangeComponent } from './header/password-change/password-change.component';
import { DialogStateService } from '../services/dialog-state.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PasswordChangeHttpHandlerService } from './header/password-change/password-change-http-handler.service';
import { AccountNameChangeHttpHandlerService } from './header/account-name-change/account-name-change-http-handler.service';

@NgModule({
  declarations: [
    HeaderComponent,
    SideNavComponent,
    FooterComponent,
    HeaderMenuComponent,
    PopUpComponent,
    AccountNameChangeComponent,
    PasswordChangeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    SideNavComponent,
    FooterComponent,
    PopUpComponent
  ],
  providers: [
    DialogStateService,
    PasswordChangeHttpHandlerService,
    AccountNameChangeHttpHandlerService
  ]
})
export class CoreModule { }
