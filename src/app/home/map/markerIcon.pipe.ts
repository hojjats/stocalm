import {Pipe, PipeTransform} from '@angular/core';
import {Sensor} from '../../shared/models/sensor.model';

@Pipe({
  name: 'markerIconPipe'
})
export class MarkerIconPipe implements PipeTransform {

  markerIconLow = {
    url: 'assets/icon/volume_low.png',
    scaledSize: {
      width: 50,
      height: 50
    }
  };

  markerIconMiddle = {
    url: 'assets/icon/volume_middle.png',
    scaledSize: {
      width: 50,
      height: 50
    }
  };

  markerIconHigh = {
    url: 'assets/icon/volume_high.png',
    scaledSize: {
      width: 50,
      height: 50
    }
  };

  markerIconDisable = {
    url: 'assets/icon/volume_off.png',
    scaledSize: {
      width: 50,
      height: 50
    }
  };

  transform(sensor: Sensor) {
    const today = new Date();
    const latestReading = new Date(sensor.readings[0].date + ' ' + sensor.readings[0].time);
    if (((today.getTime() - latestReading.getTime()) / 60000) > 60) {
      return this.markerIconDisable;
    } else if (sensor.readings[0].value >= 65) {
      return this.markerIconHigh;
    } else if (sensor.readings[0].value >= 50) {
      return this.markerIconMiddle;
    } else {
      return this.markerIconLow;
    }
  }
}
