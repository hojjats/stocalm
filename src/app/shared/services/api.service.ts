import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from './../../../environments/environment';
import {Sensor} from './../models/sensor.model';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  sensors: Sensor[] = [];
  sensors$: Subject<Sensor[]> = new Subject();

  constructor(private httpClient: HttpClient) {
    this.getSensors().pipe(
      map((data: any[]) => {
        return data.map(item => {
          return <Sensor>{
            id: item.id,
            coords: item.position,
            readings: item.readings
          };
        });
      })
    ).subscribe(next => {
      const sensors = <Sensor[]><unknown>next;
      this.sensors = sensors;
      this.sensors$.next(sensors);
    });
  }

  getReadingsBySensorId(id: number) {
    return this.httpClient.get(environment.BASE_URL + 'sensors/' + id);
  }

  getSensors() {
    return this.httpClient.get(environment.BASE_URL + 'sensors');
  }
}
