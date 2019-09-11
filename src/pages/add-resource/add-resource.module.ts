import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddResourcePage } from './add-resource';

@NgModule({
  declarations: [
    AddResourcePage,
  ],
  imports: [
    IonicPageModule.forChild(AddResourcePage),
  ],
})
export class AddResourcePageModule {}
