import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LocationViewPage } from './location-view.page';
import {ShareButtonsModule} from '@ngx-share/buttons';




const routes: Routes = [
  {
    path: '',
    component: LocationViewPage
  }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        ShareButtonsModule,
    ],
  declarations: [LocationViewPage]
})
export class LocationViewPageModule {}
