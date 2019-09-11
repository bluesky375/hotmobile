import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactmodalPage } from './contactmodal';

@NgModule({
  declarations: [
    ContactmodalPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactmodalPage),
  ],
})
export class ContactmodalPageModule {}
