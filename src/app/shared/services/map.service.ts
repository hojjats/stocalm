import {EventEmitter, Injectable} from '@angular/core';
import {Sensor} from '../models/sensor.model';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  flyToEmitter: EventEmitter<Sensor> = new EventEmitter();
  initiateDirections: EventEmitter<Sensor> = new EventEmitter();

  constructor() {
  }

}
