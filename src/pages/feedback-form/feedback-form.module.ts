import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedbackFormPage } from './feedback-form';

@NgModule({
  declarations: [
    FeedbackFormPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedbackFormPage),
  ],
})
export class FeedbackFormPageModule {}
