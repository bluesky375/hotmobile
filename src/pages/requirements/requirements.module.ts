import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequirementsPage } from './requirements';

@NgModule({
  declarations: [
    RequirementsPage,
  ],
  imports: [
    IonicPageModule.forChild(RequirementsPage),
  ],
})
export class RequirementsPageModule {}
