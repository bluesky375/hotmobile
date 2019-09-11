import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCandidateSidePage } from './create-candidate-side';

@NgModule({
  declarations: [
    CreateCandidateSidePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCandidateSidePage),
  ],
})
export class CreateCandidateSidePageModule {}
