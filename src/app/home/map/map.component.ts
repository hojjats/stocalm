import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Sensor} from '../../shared/models/sensor.model';
import {ApiService} from '../../shared/services/api.service';
import {MapService} from '../../shared/services/map.service';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Coords} from '../../shared/models/coords.model';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {NavigationService} from '../../shared/services/navigation.service';
import {AgmMap, AgmMarker} from '@agm/core';
import {MarkerPopupComponent} from './marker-popup/marker-popup.component';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewChecked, OnDestroy {

  @ViewChild('map') mapRef: AgmMap;
  @ViewChild('direction') direction: any;

  centerMapLocation: Coords = {lat: 59.313884, lng: 18.035978};
  userLocation: Coords;
  centerMapByUser = true;

  directionOrigin: any;
  directionDestination: any;

  sensors: Sensor[] = [];

  markerIconOptions = {
    url: '/assets/icon/sensor.png',
    scaledSize: {
      width: 50,
      height: 50
    }
  };

  userIconOptions = {
    url: '/assets/icon/user.png',
    scaledSize: {
      width: 50,
      height: 50
    }
  };

  interval: any;

  private subscriptions: Subscription[] = [];

  constructor(public apiService: ApiService,
              private mapService: MapService,
              public dialog: MatDialog,
              private geolocation: Geolocation,
              private navigationService: NavigationService) {
  }

  ngOnInit() {
    // this.trackUser();
    this.getSensors();
    this.setSubscriptions();
  }

  ngAfterViewChecked() {

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  setSubscriptions() {
    const subscription = this.navigationService.centerMapToUserLocation.subscribe(value => {
      this.centerMapLocation = {lat: this.mapRef.latitude, lng: this.mapRef.longitude};
      setTimeout(() => {
        this.centerMapLocation = {lat: this.userLocation.lat, lng: this.userLocation.lng};
      }, 50);
    });
    this.subscriptions.push(subscription);

    this.mapService.flyToEmitter.subscribe((sensor: Sensor) => {
      this.centerMapLocation = {lat: sensor.lat, lng: sensor.lng};
    });

    this.mapService.initiateDirections.subscribe((destinationSensor: Sensor) => {
      this.setDirections({lat: destinationSensor.lat, lng: destinationSensor.lng});
    });

    this.interval = setInterval(() => {
      this.getUserLocation();
    }, 1000);
  }

  private getSensors() {
    this.apiService.sensors$.subscribe((sensors: Sensor[]) => {
      this.sensors = sensors;
    });
  }

  setDirections(destinationCoord: Coords) {
    this.directionOrigin = this.userLocation;
    this.directionDestination = destinationCoord;
  }

  onMapClick(event) {
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('Got user position: ', position.coords.longitude, position.coords.latitude);
        this.userLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
        if (this.centerMapByUser) {
          this.centerMapLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
        }
      }, error => {
        console.error(error);
      }, {timeout: 5000, enableHighAccuracy: true});
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  setUserLocation(coords: Coords) {
    this.userLocation = coords;
    this.centerMapLocation = {lat: this.userLocation.lat, lng: this.userLocation.lng};
  }

  trackUser() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(position => {
        console.log('Got user position: ', position);
        this.userLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
        if (this.centerMapByUser) {
          this.centerMapLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
        }
      }, error => {
        console.error(error);
      }, {timeout: 5000, enableHighAccuracy: true});
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  onMapCenterChanged(event) {
    this.centerMapByUser = false;
  }

  onCenterMapByUser() {
    this.centerMapByUser = true;
  }

  onMarkerClick(event) {
    this.openMarkerDialog(
      this.getSensorFromList(event.latitude, event.longitude)
    );

  }

  onUserMarkerClick(event) {
    this.centerMapLocation = {lat: this.mapRef.latitude, lng: this.mapRef.longitude};
    setTimeout(() => {
      this.centerMapByUser = true;
    }, 50);
  }

  openMarkerDialog(sensor: Sensor) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = sensor;
    const dialogRef = this.dialog.open(MarkerPopupComponent, dialogConfig);
  }

  getSensorFromList(lat: number, lng: number): Sensor {
    let sensorFound: Sensor;
    this.sensors.forEach(sensor => {
      if (sensor.lng === lng && sensor.lat === lat) {
        sensorFound = sensor;
      }
    });
    return sensorFound;
  }


}


