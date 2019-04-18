import {Reading} from './reading.model';

export interface Sensor {
  id: string;
  x: number;
  y: number;
  readings: Reading[];
}
