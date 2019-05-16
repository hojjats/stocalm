import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../shared/services/api.service';
import {Sensor} from '../shared/models/sensor.model';
import {Reading} from '../shared/models/reading.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {
  sensors: Sensor[] = [];

  private subscriptions: Subscription[] = [];


  constructor(public apiService: ApiService) {
  }

  ngOnInit() {
    this.loadAllSensors();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  loadAllSensors() {
    const subscription = this.apiService.sensors$.subscribe((sensors: Sensor[]) => {
      this.sensors = sensors;
      this.filterDisabledSensors();
    });
    this.subscriptions.push(subscription);
  }

  filterDisabledSensors() {
    this.sensors = this.sensors.filter(sensor => {
      const today = new Date();
      const latestReading = new Date(sensor.readings[0].date + ' ' + sensor.readings[0].time);
      return (today.toLocaleDateString('sv-SE') !== latestReading.toLocaleDateString('sv-SE') ||
        (today.toLocaleDateString('sv-SE') === latestReading.toLocaleDateString('sv-SE') &&
          ((today.getTime() - latestReading.getTime()) / 60000) > 60));
    });
  }

  printSensors() {
    console.log(this.sensors);
  }

}
