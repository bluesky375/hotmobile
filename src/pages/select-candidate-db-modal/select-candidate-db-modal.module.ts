import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectCandidateDbModalPage } from './select-candidate-db-modal';

@NgModule({
  declarations: [
    SelectCandidateDbModalPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectCandidateDbModalPage),
  ],
})
export class SelectCandidateDbModalPageModule {}
