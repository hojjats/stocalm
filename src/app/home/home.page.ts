import {Component, OnDestroy} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {Sensor} from '../shared/models/sensor.model';
import {Reading} from '../shared/models/reading.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {

  readings: Reading[] = [];
  subscriptions: Subscription[] = [];

  constructor(private apiService: ApiService) {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public onSearchSensor(value: string) {
    this.readings = []; // Set init
    if (!!value) {
      const id = Number.parseInt(value, 10);
      this.apiService.getReadingsBySensorId(id)
        .subscribe((sensor: Sensor) => {
          if (!!sensor) {
            this.readings = sensor.readings;
          }
        });
    }
  }


}

