import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateSubvendorPage } from './create-subvendor';

@NgModule({
  declarations: [
    CreateSubvendorPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateSubvendorPage),
  ],
})
export class CreateSubvendorPageModule {}
