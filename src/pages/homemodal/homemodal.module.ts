import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomemodalPage } from './homemodal';

@NgModule({
  declarations: [
    HomemodalPage,
  ],
  imports: [
    IonicPageModule.forChild(HomemodalPage),
  ],
})
export class HomemodalPageModule {}
