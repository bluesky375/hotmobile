import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecruiterPage } from './recruiter';

@NgModule({
  declarations: [
    RecruiterPage,
  ],
  imports: [
    IonicPageModule.forChild(RecruiterPage),
  ],
})
export class RecruiterPageModule {}
