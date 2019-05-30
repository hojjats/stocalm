import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Sensor} from '../../shared/models/sensor.model';
import {ApiService} from '../../shared/services/api.service';
import {MapService} from '../../shared/services/map.service';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {NavigationService} from '../../shared/services/navigation.service';
import {AgmMap, GoogleMapsAPIWrapper, LatLng, LatLngBounds, LatLngBoundsLiteral} from '@agm/core';
import {MarkerPopupComponent} from './marker-popup/marker-popup.component';
import {Translations} from '../../shared/translations';
import {ToasterService} from '../../shared/services/toaster.service';
import {ControlPosition, google, MapTypeControlStyle} from '@agm/core/services/google-maps-types';
import {FilterService} from '../../shared/services/filter.service';
import {NavigationStart, Router} from '@angular/router';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {

  // ViewChildren
  @ViewChild('map') private mapRef: AgmMap;
  @ViewChild('direction') private direction: any;
  @ViewChild(GoogleMapsAPIWrapper) private gmapWrapper: GoogleMapsAPIWrapper;

  sensors: Sensor[] = [];

  // Map Options
  centerMapLocation: any = {lat: 59.407239, lng: 17.945496};
  zoom = 13;

  markerIconLow = {
    url: 'assets/icon/volume_low.png',
    scaledSize: {
      width: 50,
      height: 50
    }
  };

  markerIconMiddle = {
    url: 'assets/icon/volume_middle.png',
    scaledSize: {
      width: 50,
      height: 50
    }
  };

  markerIconHigh = {
    url: 'assets/icon/volume_high.png',
    scaledSize: {
      width: 50,
      height: 50
    }
  };

  userIconOptions = {
    url: 'assets/icon/user.png',
    scaledSize: {
      width: 50,
      height: 50
    }
  };

  MTC = false;
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
  directionSettingsOpen = true;

  // States
  setDestinationOriginState = false;
  filterListOpen = false;

  // Subscriptions
  private subscriptions: Subscription[] = [];

  constructor(public filterService: FilterService,
              public mapService: MapService,
              public dialog: MatDialog,
              private geolocation: Geolocation,
              private navigationService: NavigationService,
              private toasterService: ToasterService,
              private router: Router) {
  }

  ngOnInit() {
    // this.trackUser();
    this.getSensors();
    this.setSubscriptions();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  setToInitState() {
    this.toasterService.setDefaultValues();
    this.setDestinationOriginState = false;
    this.directionOrigin = undefined;
    this.directionDestination = undefined;
  }

  private setSubscriptions() {
    // Subscribe to map center change
    const subscription1 = this.mapService.flyToEmitter.subscribe(value => {
      this.flyTo(value.lat, value.lng, 18);
    });
    this.subscriptions.push(subscription1);

    // Subscribe to open sensor card
    const subscription2 = this.mapService.openSensorCardEmitter.subscribe((sensor: Sensor) => {
      this.openMarkerDialog(sensor);
    });
    this.subscriptions.push(subscription2);

    // Subscribe to directions initiation
    const subscription3 = this.mapService.initiateDirections.subscribe((destinationSensor: Sensor) => {
      this.setDirections(destinationSensor);
    });
    this.subscriptions.push(subscription3);

    // Subscribe to if center should follow user
    const subscription4 = this.mapService.followUserEmitter.subscribe(value => {
      if (value) {
        this.setFollowUser();
      } else {
        this.mapService.centerMapByUserState = false;
      }
    });
    this.subscriptions.push(subscription4);

    // Subscribe to switching page
    const subscription5 = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && event.url !== '/') {
        this.setToInitState();
      }
    });
    this.subscriptions.push(subscription5);


  }

  private getSensors() {
    this.sensors = this.filterService.filteredSensors;
    const subscription = this.filterService.filteredSensors$.subscribe((sensors: Sensor[]) => {
      this.sensors = sensors;
    });
    this.subscriptions.push(subscription);
  }

  setDirections(destinationSensor: Sensor) {
    // Set direction destination to the sensor location
    this.directionDestination = {lat: destinationSensor.coords.lat, lng: destinationSensor.coords.lng};
    // If user location is found, set user location as destination origin
    if (!!this.mapService.userLocation) {
      this.directionOrigin = this.mapService.userLocation;
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

  onMapCenterChanged(event) {
    if (!!this.mapService.userLocation) {
      // If new center coords is same as user coords the map if following the user,
      // else it means that center is moved by the user and centerMapByUserState should be false.
      if (!(this.isSameCoords(event.lat, this.mapService.userLocation.lat) &&
        this.isSameCoords(event.lng, this.mapService.userLocation.lng))) {
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
    this.directionsOptions.selectedMode = mode.mode;
  }

  setDestinationOrigin() {
    this.setDestinationOriginState = true;
    this.directionOrigin = undefined;
    this.toasterService.onShowToaster('Välj startpunkt genom att klicka på kartan', 'info');
  }

  onToggleFollowUser() {
    this.mapService.centerMapByUserState = !this.mapService.centerMapByUserState;
    if (this.mapService.centerMapByUserState && !!this.mapService.userLocation) {
      this.flyTo(this.mapService.userLocation.lat, this.mapService.userLocation.lng, this.zoom);
    }
    this.mapService.followUserEmitter.emit(this.mapService.centerMapByUserState);
  }

  redirectNavigationInGoogle() {
    const url = 'https://www.google.com/maps/dir/?api=1&origin=' +
      this.directionOrigin.lat +
      ',' +
      this.directionOrigin.lng +
      '&destination=' +
      this.directionDestination.lat +
      ',' +
      this.directionDestination.lng +
      '&travelmode=' +
      this.directionsOptions.selectedMode.toLowerCase();
    window.open(url, '_blank');

  }

  cancelNavigation() {
    this.directionOrigin = undefined;
    this.directionDestination = undefined;
    this.directionsOptions.selectedMode = this.directionsOptions.travelModes[0].mode;

  }

  flyTo(lat: number, lng: number, zoom: number) {
    this.centerMapLocation = {lat: this.mapRef.latitude, lng: this.mapRef.longitude};
    this.zoom = this.mapRef.zoom;
    setTimeout(() => {
      this.centerMapLocation = {lat: lat, lng: lng};
      this.zoom = zoom;
    }, 50);
  }

  onFilterResultClick(sensor: Sensor) {
    this.filterListOpen = false;
    this.flyTo(sensor.coords.lat, sensor.coords.lng, 18);
  }


}


