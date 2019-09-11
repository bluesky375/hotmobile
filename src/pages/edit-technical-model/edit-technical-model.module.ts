import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditTechnicalModelPage } from './edit-technical-model';

@NgModule({
  declarations: [
    EditTechnicalModelPage,
  ],
  imports: [
    IonicPageModule.forChild(EditTechnicalModelPage),
  ],
})
export class EditTechnicalModelPageModule {}
