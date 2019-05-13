import {EventEmitter, Injectable} from '@angular/core';
import {Sensor} from '../models/sensor.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  flyToEmitter: EventEmitter<any> = new EventEmitter();
  initiateDirections: EventEmitter<Sensor> = new EventEmitter();
  followUserEmitter: EventEmitter<boolean> = new EventEmitter();

  // User location
  userLocation: any;

  // States
  centerMapByUserState = false;

  constructor() {
    // Get user position by interval
    setInterval(() => {
      this.getUserLocation();
    }, 1000);
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('Got user position: ', position.coords.longitude, position.coords.latitude);
        this.userLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
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
        console.log('Got user position: ', position);
        this.userLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
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
