import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TechnicalDbPage } from './technical-db';

@NgModule({
  declarations: [
    TechnicalDbPage,
  ],
  imports: [
    IonicPageModule.forChild(TechnicalDbPage),
  ],
})
export class TechnicalDbPageModule {}
