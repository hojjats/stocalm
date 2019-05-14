import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdvancedSearchPage } from './advanced-search.page';
import {SearchComponent} from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: AdvancedSearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AdvancedSearchPage,
    SearchComponent,
  ]
})
export class AdvancedSearchPageModule {}
