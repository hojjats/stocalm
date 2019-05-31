import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../shared/services/api.service';
import {Sensor} from '../shared/models/sensor.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  sensors: Sensor[] = [];
  activeState: any;

  private subscriptions: Subscription[] = [];


  constructor(public apiService: ApiService) {
  }


  ngOnInit() {
    this.loadAllSensors();
    this.activeState = 'issues';
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  loadAllSensors() {
    this.sensors = this.apiService.sensors;
    this.filterDisabledSensors();

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
      return ((today.getTime() - latestReading.getTime()) / 60000) > (60 * 24);

    });
  }

  printSensors() {
    console.log(this.sensors);
  }

}
