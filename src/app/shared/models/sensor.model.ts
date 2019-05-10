import {Reading} from './reading.model';
import {Coords} from './coords.model';

export interface Sensor {
  id: string;
  coords: Coords;
  readings: Array<Reading>;
  hourMeanValue: Array<Array<number>> ; // Weekdays: 0 === Moday, 6 === Sunday. Hours: 0-23
  weekdayMeanValue: Array<number> ; // 0 === Moday, 6 === Sunday
}
