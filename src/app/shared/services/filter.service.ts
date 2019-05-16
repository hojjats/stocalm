import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Sensor} from '../models/sensor.model';
import {Subject} from 'rxjs';
import {MapService} from './map.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Filters} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filteredSensors$: Subject<Sensor[]> = new Subject();
  filteredSensors: Sensor[] = [];
  tempFiltration: Sensor[] = [];

  activeFilters: number[] = [];

  form: FormGroup = new FormGroup({
    'latestDecibel': new FormControl({lower: 0, upper: 100}),
    'decibelMeanValue': new FormControl({lower: 0, upper: 100}),
    'distance': new FormControl(null)
  });

  constructor(private apiService: ApiService,
              private mapService: MapService) {
    apiService.sensors$.subscribe((sensors: Sensor[]) => {
      this.filteredSensors$.next(sensors);
      this.filteredSensors = sensors;
      this.tempFiltration = sensors;
    });
  }

  applyFilters() {
    this.filteredSensors = this.tempFiltration;
    this.filteredSensors$.next(this.tempFiltration);
  }

  reset() {
    this.activeFilters = [];
    this.tempFiltration = this.apiService.sensors;
    this.applyFilters();
  }

  filterByLatestDecibelValue(minDecibel: number, maxDecibel: number) {
    this.tempFiltration = this.tempFiltration.filter(sensor => {
      const lastValue = sensor.readings[0].value;
      return lastValue >= minDecibel && lastValue <= maxDecibel;
    });
  }

  filterByTodayMeanValue(minDecibel: number, maxDecibel: number) {
    // Get todays day and set monday === 0 and sunday === 6
    let toady = new Date().getDay() - 1;
    if (toady < 0) {
      toady = 6;
    }
    // Filter
    this.tempFiltration = this.tempFiltration.filter(sensor => {
      const meanValue = sensor.weekdayMeanValue[toady];
      return meanValue >= minDecibel && meanValue < maxDecibel;
    });
  }

  filterByDistance(maxDistance: number) {
    if (!!this.mapService.userLocation) {
      this.tempFiltration = this.tempFiltration.filter(sensor => {
        const distance = this.calcDistance(
          sensor.coords.lng, sensor.coords.lat, this.mapService.userLocation.lng, this.mapService.userLocation.lat
        );
        return distance < maxDistance;
      });
    }
  }

  updateTempFiltration(form: FormGroup) {
    this.tempFiltration = this.apiService.sensors;
    this.activeFilters.forEach(filter => {
      switch (filter) {
        case Filters.DISTANCE:
          this.filterByDistance(form.get('distance').value);
          break;
        case  Filters.LATEST_DECIBEL_VALUE:
          this.filterByLatestDecibelValue(
            form.get('latestDecibel').value.lower, form.get('latestDecibel').value.upper
          );
          break;
        case  Filters.TODAY_DECIBEL_MEAN_VALUE:
          this.filterByTodayMeanValue(
            form.get('decibelMeanValue').value.lower, form.get('decibelMeanValue').value.upper
          );
          break;
      }
    });
  }

  calcDistance(lng1: number, lat1: number, lng2: number, lat2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = this.deg2rad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg): number {
    return deg * (Math.PI / 180);
  }

}
