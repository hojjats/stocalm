import {Reading} from './reading.model';
import {Coords} from './coords.model';

export interface Sensor {
  id: string;
  coords: Coords;
  readings: Reading[];
}
