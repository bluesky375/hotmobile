import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountsPaidHistoryPage } from './accounts-paid-history';

@NgModule({
  declarations: [
    AccountsPaidHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountsPaidHistoryPage),
  ],
})
export class AccountsPaidHistoryPageModule {}
