import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CandidateHistoryDetailsPage } from './candidate-history-details';

@NgModule({
  declarations: [
    CandidateHistoryDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CandidateHistoryDetailsPage),
  ],
})
export class CandidateHistoryDetailsPageModule {}
