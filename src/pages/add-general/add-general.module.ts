import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddGeneralPage } from './add-general';

@NgModule({
  declarations: [
    AddGeneralPage,
  ],
  imports: [
    IonicPageModule.forChild(AddGeneralPage),
  ],
})
export class AddGeneralPageModule {}
