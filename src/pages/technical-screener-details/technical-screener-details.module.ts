import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TechnicalScreenerDetailsPage } from './technical-screener-details';

@NgModule({
  declarations: [
    TechnicalScreenerDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TechnicalScreenerDetailsPage),
  ],
})
export class TechnicalScreenerDetailsPageModule {}
