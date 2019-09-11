import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneralQuestionPage } from './general-question';

@NgModule({
  declarations: [
    GeneralQuestionPage,
  ],
  imports: [
    IonicPageModule.forChild(GeneralQuestionPage),
  ],
})
export class GeneralQuestionPageModule {}
