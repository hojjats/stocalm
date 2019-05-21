import {EventEmitter, Injectable} from '@angular/core';
import {Sensor} from '../models/sensor.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  flyToEmitter: EventEmitter<any> = new EventEmitter();
  initiateDirections: EventEmitter<Sensor> = new EventEmitter();
  followUserEmitter: EventEmitter<boolean> = new EventEmitter();
  openSensorCardEmitter: EventEmitter<Sensor> = new EventEmitter();

  // User location
  userLocation: any;

  // States
  centerMapByUserState = false;

  constructor() {
    this.trackUser();
  }

  /**
   * Get user position one time.
   *
   * @deprecated As of version 2, because of multiple alert from web browser when used in a interval.
   * Use @link #trackUser() instead.
   *
   */
  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('Got user position: ', position.coords.longitude, position.coords.latitude);
        if (!this.userLocation ||
          (position.coords.longitude !== this.userLocation.lng || position.coords.latitude !== this.userLocation.lat)) {
          this.userLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
        }
        if (this.centerMapByUserState) {
          this.flyToEmitter.emit({lat: position.coords.latitude, lng: position.coords.longitude});
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
        console.log('Got user position: ', position.coords.longitude, position.coords.latitude);
        if (!this.userLocation ||
          (position.coords.longitude !== this.userLocation.lng || position.coords.latitude !== this.userLocation.lat)) {
          this.userLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
        }
        if (this.centerMapByUserState) {
          this.flyToEmitter.emit({lat: position.coords.latitude, lng: position.coords.longitude});
        }
      }, error => {
        console.error(error);
      }, {timeout: 5000, enableHighAccuracy: true});
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

}
