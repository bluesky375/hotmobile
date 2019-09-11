import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddNotesPage } from './add-notes';

@NgModule({
  declarations: [
    AddNotesPage,
  ],
  imports: [
    IonicPageModule.forChild(AddNotesPage),
  ],
})
export class AddNotesPageModule {}
