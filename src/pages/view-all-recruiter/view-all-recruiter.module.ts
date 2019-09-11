import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewAllRecruiterPage } from './view-all-recruiter';

@NgModule({
  declarations: [
    ViewAllRecruiterPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewAllRecruiterPage),
  ],
})
export class ViewAllRecruiterPageModule {}
