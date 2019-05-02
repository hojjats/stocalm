import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Sensor} from '../../shared/models/sensor.model';
import {ApiService} from '../../shared/services/api.service';
import {MapService} from '../../shared/services/map.service';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {NavigationService} from '../../shared/services/navigation.service';
import {AgmMap} from '@agm/core';
import {MarkerPopupComponent} from './marker-popup/marker-popup.component';
import {Translations} from '../../shared/translations';
import {ToasterService} from '../../shared/services/toaster.service';
import {ControlPosition, MapTypeControlStyle} from '@agm/core/services/google-maps-types';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {

  // ViewChildren
  @ViewChild('map') mapRef: AgmMap;
  @ViewChild('direction') direction: any;

  // All sensors from database
  sensors: Sensor[] = [];

  // Map Options
  centerMapLocation: any = {lat: 59.313884, lng: 18.035978};
  zoom = 13;
  userLocation: any;
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

  MTC = true;
  MTCOption = {
    position: ControlPosition.TOP_RIGHT,
    style: MapTypeControlStyle.HORIZONTAL_BAR
  };

  // Direction
  directionOrigin: any;
  directionDestination: any;
  directionsOptions = {
    selectedMode: Translations.travelModes[0].mode,
    travelModes: Translations.travelModes
  };

  // States
  setDestinationOriginState = false;

  // Subscriptions
  private subscriptions: Subscription[] = [];
  getUserLocationinterval: any;

  constructor(public apiService: ApiService,
              private mapService: MapService,
              public dialog: MatDialog,
              private geolocation: Geolocation,
              private navigationService: NavigationService,
              private toasterService: ToasterService) {
  }

  ngOnInit() {
    // this.trackUser();
    this.getSensors();
    this.setSubscriptions();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    if (this.getUserLocationinterval) {
      clearInterval(this.getUserLocationinterval);
    }
  }

  private setSubscriptions() {
    // Subscribe to map center change
    let subscription = this.mapService.flyToEmitter.subscribe((sensor: Sensor) => {
      this.centerMapLocation = {lat: this.mapRef.latitude, lng: this.mapRef.longitude};
      this.zoom = this.mapRef.zoom;
      setTimeout(() => {
        this.centerMapLocation = {lat: sensor.coords.lat, lng: sensor.coords.lng};
        this.zoom = 18;
      }, 50);
    });
    this.subscriptions.push(subscription);

    // Subscribe to directions initiation
    subscription = this.mapService.initiateDirections.subscribe((destinationSensor: Sensor) => {
      this.setDirections(destinationSensor);
    });
    this.subscriptions.push(subscription);

    // Subscribe to if center should follow user
    subscription = this.mapService.followUserEmitter.subscribe(value => {
      if (value) {
        this.setFollowUser();
      } else {
        this.mapService.centerMapByUserState = false;
      }
    });
    this.subscriptions.push(subscription);

    // Get user position by interval
    this.getUserLocationinterval = setInterval(() => {
      this.getUserLocation();
    }, 1000);

  }

  private getSensors() {
    this.apiService.sensors$.subscribe((sensors: Sensor[]) => {
      this.sensors = sensors;
    });
  }

  setDirections(destinationSensor: Sensor) {
    // Set direction destination to the sensor location
    this.directionDestination = {lat: destinationSensor.coords.lat, lng: destinationSensor.coords.lng};
    // If user location is found, set user location as destination origin
    if (!!this.userLocation) {
      this.directionOrigin = this.userLocation;
      // Else ask the user to set destination origin
    } else {
      this.setDestinationOriginState = true;
      this.toasterService.onShowToaster('Välj startpunkt genom att klicka på kartan', 'info');
    }
  }

  onMapClick(event) {
    if (this.setDestinationOriginState) {
      this.directionOrigin = {lat: event.coords.lat, lng: event.coords.lng};
      this.setDestinationOriginState = false;
      this.toasterService.setDefaultValues();
    }
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('Got user position: ', position.coords.longitude, position.coords.latitude);
        this.userLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
        if (this.mapService.centerMapByUserState) {
          this.centerMapLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
        }
      }, error => {
        console.error(error);
      }, {timeout: 5000, enableHighAccuracy: true});
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  trackUser() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(position => {
        console.log('Got user position: ', position);
        this.userLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
        if (this.mapService.centerMapByUserState) {
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
    if (!!this.userLocation) {
      // If new center coords is same as user coords the map if following the user,
      // else it means that center is moved by the user and centerMapByUserState should be false.
      if (!(this.isSameCoords(event.lat, this.userLocation.lat) &&
        this.isSameCoords(event.lng, this.userLocation.lng))) {
        this.mapService.centerMapByUserState = false;
      }
    }
  }

  isSameCoords(c1: number, c2: number): boolean {
    return Math.round(c1 * 1000000) / 1000000 === Math.round(c2 * 1000000) / 1000000;
  }

  onMarkerClick(event) {
    this.openMarkerDialog(
      this.getSensorFromList(event.latitude, event.longitude)
    );

  }

  onUserMarkerClick(event) {
    this.setFollowUser();
  }

  setFollowUser() {
    this.centerMapLocation = {lat: this.mapRef.latitude, lng: this.mapRef.longitude};
    setTimeout(() => {
      this.mapService.centerMapByUserState = true;
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
      if (sensor.coords.lng === lng && sensor.coords.lat === lat) {
        sensorFound = sensor;
      }
    });
    return sensorFound;
  }

  onChangeDirectionMode(mode: any) {
    // If user clicks on selected mode, close directions
    if (this.directionsOptions.selectedMode === mode.mode) {
      this.directionOrigin = undefined;
      this.directionDestination = undefined;
      this.directionsOptions.selectedMode = this.directionsOptions.travelModes[0].mode;
      // Else set new mode
    } else {
      this.directionsOptions.selectedMode = mode.mode;
    }
  }

  setDestinationOrigin() {
    this.setDestinationOriginState = true;
    this.directionOrigin = undefined;
    this.toasterService.onShowToaster('Välj startpunkt genom att klicka på kartan', 'info');
  }


}


