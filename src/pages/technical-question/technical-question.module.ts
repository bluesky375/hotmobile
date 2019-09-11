import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TechnicalQuestionPage } from './technical-question';

@NgModule({
  declarations: [
    TechnicalQuestionPage,
  ],
  imports: [
    IonicPageModule.forChild(TechnicalQuestionPage),
  ],
})
export class TechnicalQuestionPageModule {}
