import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelfRatingPage } from './self-rating';

@NgModule({
  declarations: [
    SelfRatingPage,
  ],
  imports: [
    IonicPageModule.forChild(SelfRatingPage),
  ],
})
export class SelfRatingPageModule {}
