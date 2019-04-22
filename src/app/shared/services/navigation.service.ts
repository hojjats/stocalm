import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  placesIsOpen = false;

  public openPlacesEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  togglePlaces() {
    this.placesIsOpen = !this.placesIsOpen;
    this.openPlacesEmitter.emit(this.placesIsOpen);
  }

  closePlaces() {
    this.placesIsOpen = false;
    this.openPlacesEmitter.emit(this.placesIsOpen);
  }

  openPlaces() {
    this.placesIsOpen = true;
    this.openPlacesEmitter.emit(this.placesIsOpen);
  }

}
