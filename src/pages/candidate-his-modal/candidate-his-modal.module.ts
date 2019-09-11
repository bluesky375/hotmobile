import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CandidateHisModalPage } from './candidate-his-modal';

@NgModule({
  declarations: [
    CandidateHisModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CandidateHisModalPage),
  ],
})
export class CandidateHisModalPageModule {}
