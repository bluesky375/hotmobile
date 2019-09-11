import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OquestionPage } from './oquestion';

@NgModule({
  declarations: [
    OquestionPage,
  ],
  imports: [
    IonicPageModule.forChild(OquestionPage),
  ],
})
export class OquestionPageModule {}
