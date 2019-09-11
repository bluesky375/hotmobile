import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTechnicalPage } from './add-technical';

@NgModule({
  declarations: [
    AddTechnicalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTechnicalPage),
  ],
})
export class AddTechnicalPageModule {}
