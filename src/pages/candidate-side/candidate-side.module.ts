import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CandidateSidePage } from './candidate-side';

@NgModule({
  declarations: [
    CandidateSidePage,
  ],
  imports: [
    IonicPageModule.forChild(CandidateSidePage),
  ],
})
export class CandidateSidePageModule {}
