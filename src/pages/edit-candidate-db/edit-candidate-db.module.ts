import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditCandidateDbPage } from './edit-candidate-db';

@NgModule({
  declarations: [
    EditCandidateDbPage,
  ],
  imports: [
    IonicPageModule.forChild(EditCandidateDbPage),
  ],
})
export class EditCandidateDbPageModule {}
