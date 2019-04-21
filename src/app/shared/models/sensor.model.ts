import {Reading} from './reading.model';

export interface Sensor {
  id: string;
  name: string;
  lng: number;
  lat: number;
  readings: Reading[];
}
