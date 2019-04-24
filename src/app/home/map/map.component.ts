import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Sensor} from '../../shared/models/sensor.model';
import {ApiService} from '../../shared/services/api.service';
import {MapService} from '../../shared/services/map.service';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewChecked, OnDestroy {

  @ViewChild('map') mapRef: ElementRef;
  lat: number;
  lng: number;

  directionOrigin: any;
  directionDestination: any;

  sensors: Sensor[] = [];

  labelOptions = {
    color: 'white',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: 'bold',
    text: 'some text',
    width: '10px'
  };

  private subscriptions: Subscription[] = [];
  private map: any;

  constructor(public apiService: ApiService,
              private mapService: MapService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.setInitialLatLng();
    this.setDirections();
    this.getSensors();
  }

  ngAfterViewChecked() {

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private getSensors() {
    this.apiService.getSensors().subscribe((sensors: Sensor[]) => {
      this.sensors = sensors;
    });
  }

  private setInitialLatLng() {
    this.getUserLocation();
  }

  setDirections() {
    this.directionOrigin = {lat: this.lat, lng: this.lng};
    this.directionDestination = {lat: 59.313884, lng: 18.035978};
  }

  onChoseLocation(event) {
    console.log(event);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    console.log(event);
  }

  getUserLocation() {
    /*if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }*/
    this.lat = 59.328784;
    this.lng = 18.024202;
  }


}


