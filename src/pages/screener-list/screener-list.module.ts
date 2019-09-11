import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScreenerListPage } from './screener-list';

@NgModule({
  declarations: [
    ScreenerListPage,
  ],
  imports: [
    IonicPageModule.forChild(ScreenerListPage),
  ],
})
export class ScreenerListPageModule {}
