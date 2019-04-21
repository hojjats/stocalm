import {Sensor} from './models/sensor.model';

export class Constants {

  // Only for testing
  public static sensors: Sensor[] = [
    {
      id: '1',
      name: 'Rålambshovsparken',
      lng: 18.024202,
      lat: 59.328784,
      readings: [
        {date: '2018-01-01', time: '10:00', value: 3.5}
      ]
    },
    {
      id: '2',
      name: 'Tanto',
      lng: 18.035978,
      lat: 59.313884,
      readings: [
        {date: '2018-01-01', time: '10:00', value: 1.5}
      ]
    }
  ];

}
