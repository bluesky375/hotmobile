import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CsmPage } from './csm';

@NgModule({
  declarations: [
    CsmPage,
  ],
  imports: [
    IonicPageModule.forChild(CsmPage),
  ],
})
export class CsmPageModule {}
