import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from './../../../environments/environment';
import {Sensor} from './../models/sensor.model';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Reading} from '../models/reading.model';

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
                        readings: item.readings,
                        hourMeanValue: item.hourMeanValue,
                        weekdayMeanValue: item.weekdayMeanValue
                    };
                });
            })
        ).subscribe(next => {
            const sensors = <Sensor[]><unknown>next;
            sensors.forEach(sensor => this.sortReadings(sensor));
            this.sensors = sensors;
            console.log(this.sensors)
            this.sensors$.next(this.sensors);
        });
    }

    sortReadings(sensor) {
        sensor.readings = sensor.readings.sort(((a, b) => {
            if (a.date < b.date) {
                return 1;
            } else if (a.date > b.date) {
                return -1;
            } else if (a.time.substring(0, 5) < b.time.substring(0, 5)) {
                return 1;
            } else if (a.time.substring(0, 5) > b.time.substring(0, 5)) {
                return -1;
            } else {
                return 0;
            }
        }));
    }

  getReadingsBySensorId(id: number) {
    return this.httpClient.get(environment.BASE_URL + 'sensors/' + id);
  }

  getSensors() {
    return this.httpClient.get(environment.BASE_URL + 'sensors');
  }

  addReading(sensorId: string, newReading: Reading) {
    return this.httpClient.post(environment.BASE_URL + 'sensors/readings/' + sensorId, newReading);
  }

  getRealTimeWeather(lng: number, lat: number) {
    return this.httpClient.get(
      environment.BASE_URL + 'weather/now/lng/' + lng + '/lat/' + lat
    );
  }

  getForecast(lng: number, lat: number) {
    return this.httpClient.get(environment.BASE_URL + 'weather/forecast/lng/' + lng + '/lat/' + lat);
  }

}
