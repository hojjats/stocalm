import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from './../../../environments/environment';
import {Sensor} from './../models/sensor.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Only for testing
  public testAddSensor: Sensor =
    {
      id: '3',
      name: 'Högalidsparken',
      lng: 18.035846,
      lat: 59.317402,
      readings: [
        {date: '2018-01-01', time: '10:00', value: 3.5}
      ]
    }
  ;

  sensors: Sensor[] = [];
  sensors$: Subject<Sensor[]> = new Subject();

  constructor(private httpClient: HttpClient) {
    this.getSensors().subscribe((sensors: Sensor[]) => {
      this.sensors$.next(sensors);
      this.sensors = sensors;
    });
  }

  getReadingsBySensorId(id: number) {
    return this.httpClient.get(environment.BASE_URL + 'sensors/' + id);
  }

  getSensors() {
    return this.httpClient.get(environment.BASE_URL + 'sensors');
  }
}
