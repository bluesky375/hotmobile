import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCandidateDbPage } from './add-candidate-db';

@NgModule({
  declarations: [
    AddCandidateDbPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCandidateDbPage),
  ],
})
export class AddCandidateDbPageModule {}
