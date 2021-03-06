import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {HomePage} from './home.page';
import {MapComponent} from './map/map.component';
import {MarkersComponent} from './markers/markers.component';

import {AgmCoreModule} from '@agm/core';
import {AgmDirectionModule} from 'agm-direction';
import {SearchComponent} from './map/search/search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCPbmUU1FOGg92CjX6FBFbU56hHNWTmlw0'
    }),
    AgmDirectionModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [
    HomePage,
    MapComponent,
    MarkersComponent,
    SearchComponent
  ],
  entryComponents: [],
})
export class HomePageModule {

}
