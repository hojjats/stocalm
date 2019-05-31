import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LocationViewPage } from './location-view.page';
import {ShareButtonsModule} from '@ngx-share/buttons';
import {ChartComponent} from './chart/chart.component';
import {ChartsModule} from 'ng2-charts';




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
        ChartsModule,
    ],
  declarations: [LocationViewPage, ChartComponent]
})
export class LocationViewPageModule {}
