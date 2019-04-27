import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {NavigationComponent} from './navigation/navigation.component';

import {MatDialogModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MarkerPopupComponent} from './home/map/marker-popup/marker-popup.component';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {ToasterPopupComponent} from './shared/toaster-popup/toaster-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MarkerPopupComponent,
    ToasterPopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,
    IonicModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent],
  entryComponents: [MarkerPopupComponent]
})
export class AppModule {
}
