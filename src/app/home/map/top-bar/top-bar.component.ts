import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/services/api.service';
import {Weather} from '../../../shared/models/weather.model';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit {

  @Input()
  public set setUserLocation(position: any) {
    if (!!position) {
      this.getWeather(position.lng, position.lat);
    }
  }

  weather: Weather;

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
  }

  getWeather(lng: number, lat: number) {
    this.apiService.getRealTimeWeather(lng, lat)
      .subscribe((weather: Weather) => {
        this.weather = weather;
      });
  }

}
