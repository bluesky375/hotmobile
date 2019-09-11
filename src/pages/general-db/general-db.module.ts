import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneralDbPage } from './general-db';

@NgModule({
  declarations: [
    GeneralDbPage,
  ],
  imports: [
    IonicPageModule.forChild(GeneralDbPage),
  ],
})
export class GeneralDbPageModule {}
