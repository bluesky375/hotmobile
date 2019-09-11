import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCandidatePage } from './create-candidate';

@NgModule({
  declarations: [
    CreateCandidatePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCandidatePage),
  ],
})
export class CreateCandidatePageModule {}
