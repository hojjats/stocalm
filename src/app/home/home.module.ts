import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AgmCoreModule} from '@agm/core';
import {AgmDirectionModule} from 'agm-direction';

import {HomePage} from './home.page';
import {MapComponent} from './map/map.component';
import {TopBarComponent} from './map/top-bar/top-bar.component';
import {MarkerIconPipe} from './map/markerIcon.pipe';

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
    TopBarComponent,
    MarkerIconPipe
  ],
  entryComponents: [],
})
export class HomePageModule {

}
