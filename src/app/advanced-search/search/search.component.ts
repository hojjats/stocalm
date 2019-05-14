import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Sensor} from '../../shared/models/sensor.model';
import {MapService} from '../../shared/services/map.service';
import {ApiService} from '../../shared/services/api.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {

  @ViewChild('input') input: ElementRef;
  sensors: Sensor[];
  searchResult: Sensor[] = [];

  @Input() set setDisabled(disabled: boolean) {
    this.input.nativeElement.value = '';
    this.searchResult = [];
    this.disabled = disabled;
  }

  disabled = false;

  subscriptions: Subscription[] = [];

  constructor(private mapService: MapService,
              private apiService: ApiService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.apiService.sensors.length > 0) {
      this.sensors = this.apiService.sensors;
    } else {
      const subscription = this.apiService.sensors$.subscribe((sensors: Sensor[]) => {
        this.sensors = sensors;
      });
      this.subscriptions.push(subscription);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  search(input: string) {
    if (input.length <= 0) {
      this.searchResult = [];
    } else if (input.length < 2) {
      this.searchResult = this.sensors.filter(sensor =>
        sensor.coords.location.name.charAt(0).toLowerCase() ===
        input.charAt(0).toLowerCase());
    } else {
      this.searchResult = this.sensors.filter(sensor => sensor.coords.location.name.toLowerCase().includes(input.toLowerCase()));
    }
  }

  onSearchResultClick(sensor: Sensor) {
    this.router.navigate(['/']).finally(() => {
      this.mapService.flyToEmitter.emit({lat: sensor.coords.lat, lng: sensor.coords.lng});
      this.mapService.openSensorCardEmitter.emit(sensor);
    });
  }

}
