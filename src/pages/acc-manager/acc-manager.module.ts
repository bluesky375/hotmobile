import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccManagerPage } from './acc-manager';

@NgModule({
  declarations: [
    AccManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(AccManagerPage),
  ],
})
export class AccManagerPageModule {}
