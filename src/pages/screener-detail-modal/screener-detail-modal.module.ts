import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScreenerDetailModalPage } from './screener-detail-modal';

@NgModule({
  declarations: [
    ScreenerDetailModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ScreenerDetailModalPage),
  ],
})
export class ScreenerDetailModalPageModule {}
