import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  public togglePlacesEmitter: EventEmitter = new EventEmitter();

  constructor() { }
}
