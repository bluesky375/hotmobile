import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResourceModalPage } from './resource-modal';

@NgModule({
  declarations: [
    ResourceModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ResourceModalPage),
  ],
})
export class ResourceModalPageModule {}
