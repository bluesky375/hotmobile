import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InterviewModalPage } from './interview-modal';

@NgModule({
  declarations: [
    InterviewModalPage,
  ],
  imports: [
    IonicPageModule.forChild(InterviewModalPage),
  ],
})
export class InterviewModalPageModule {}
