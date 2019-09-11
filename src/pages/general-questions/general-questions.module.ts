import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneralQuestionsPage } from './general-questions';

@NgModule({
  declarations: [
    GeneralQuestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(GeneralQuestionsPage),
  ],
})
export class GeneralQuestionsPageModule {}
