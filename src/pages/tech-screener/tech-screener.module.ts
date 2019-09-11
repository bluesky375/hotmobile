import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TechScreenerPage } from './tech-screener';

@NgModule({
  declarations: [
    TechScreenerPage,
  ],
  imports: [
    IonicPageModule.forChild(TechScreenerPage),
  ],
})
export class TechScreenerPageModule {}
