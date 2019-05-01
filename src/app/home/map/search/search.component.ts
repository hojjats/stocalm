import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Sensor} from '../../../shared/models/sensor.model';
import {MapService} from '../../../shared/services/map.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  @Input() sensors: Sensor[];
  @ViewChild('input') input: ElementRef;

  searchResult: Sensor[] = [];

  openSearchInput = false;

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
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
    this.mapService.flyToEmitter.emit(sensor);
  }

  toggleOpenSearchInput() {
    if (this.openSearchInput) {
      this.input.nativeElement.value = '';
      this.searchResult = [];
    }
    this.openSearchInput = !this.openSearchInput;
  }

}
