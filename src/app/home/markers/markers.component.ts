import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../shared/services/api.service';
import {NavigationService} from '../../shared/services/navigation.service';
import {MapService} from '../../shared/services/map.service';
import {Sensor} from '../../shared/models/sensor.model';

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styleUrls: ['./markers.component.scss'],
})
export class MarkersComponent implements OnInit, OnDestroy {

  @ViewChild('markersContainer') markersContainer: ElementRef;

  constructor(public apiService: ApiService,
              private navigationService: NavigationService,
              private mapService: MapService) {
  }

  ngOnInit() {
    console.log(this.markersContainer);
    this.navigationService.openPlacesEmitter.subscribe(value => {
      if (value) {
        this.markersContainer.nativeElement.classList.add('open');
      } else {
        this.markersContainer.nativeElement.classList.remove('open');
      }
    });
  }

  ngOnDestroy() {
    this.navigationService.closePlaces();
  }

  flyTo(sensor: Sensor) {
    this.mapService.flyToEmitter.emit(sensor);
    this.navigationService.closePlaces();
  }

}
