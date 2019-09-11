import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisplayQuestionsPage } from './display-questions';

@NgModule({
  declarations: [
    DisplayQuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(DisplayQuestionsPage),
  ],
})
export class DisplayQuestionsPageModule {}
