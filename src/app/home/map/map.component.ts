import {AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../environments/environment';
import {Sensor} from '../../shared/models/sensor.model';
import {FeatureCollection, GeoJson} from './geo';
import {ApiService} from '../../shared/services/api.service';
import {MapService} from '../../shared/services/map.service';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {MarkerPopupComponent} from './marker-popup/marker-popup.component';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewChecked, OnDestroy {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lng = 18.040243;
  lat = 59.316087;

  // data
  source: any;
  markers: any[] = [];

  sensors: Sensor[] = [];

  subscriptions: Subscription[] = [];


  constructor(public apiService: ApiService,
              private mapService: MapService,
              public dialog: MatDialog) {
    mapboxgl.accessToken = environment.mapBoxAccessToken;
  }

  ngOnInit() {
    this.initiateMap();
    const subscription = this.mapService.flyToEmitter.subscribe((sensor: Sensor) => {
      this.flyToLocation(sensor);
    });
    this.subscriptions.push(subscription);
  }

  ngAfterViewChecked() {

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private initiateMap() {
    // Get user location
    this.setCurrentLocation();
    // Get sensors
    const subscription = this.apiService.getSensors().subscribe((sensors: Sensor[]) => {
      // Set sensors for displaying buttons
      this.apiService.sensors = sensors;
      // Convert sensors to markers
      sensors.forEach(sensor => {
        this.markers.push(
          new GeoJson([sensor.lng, sensor.lat], sensor)
        );
      });
      // Build and create map view
      this.buildMap();
      this.map.resize();
    });
    this.subscriptions.push(subscription);
  }

  private setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lng = position.coords.longitude;
        this.lat = position.coords.latitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        });
      }, error => console.error(error));
    }
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });

    this.map.on('load', (event) => {

      /// register source
      this.map.addSource('stocalm', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      /// get source
      this.source = this.map.getSource('stocalm');

      /// Set data source
      const data = new FeatureCollection(this.markers);
      this.source.setData(data);

      /// create map layers
      this.map.addLayer({
        id: 'stocalm',
        source: 'stocalm',
        type: 'symbol',
        layout: {
          'text-field': '{name}',
          'text-size': 10,
          'text-transform': 'uppercase',
          'icon-image': 'marker-15',
          'icon-size': 3,
          'text-offset': [0, 3]
        },
        paint: {
          'text-color': '#000000',
          'text-halo-color': '#fff',
          'text-halo-width': 2
        }
      });

    });

    // Add click listener to map
    this.map.on('click', (e) => {
      const features = this.map.queryRenderedFeatures(e.point, {
        layers: ['stocalm']
      });
      if (!!features.length) {
        const sensor: Sensor = features[0].properties;
        sensor.readings = JSON.parse(features[0].properties.readings); // Fetures returns array as string?? Must convert back to array
        this.openSensorDetails(sensor);
      }
    });

    /*// Add Marker on Click
    this.map.on('click', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat];
      const newMarker = new GeoJson(coordinates, {message: this.message});
      this.markers.push(newMarker);
      console.log(newMarker);
    });


    // Creates a popup inside map
    const popup = new mapboxgl.Popup({offset: [0, -15]})
      .setLngLat(feature.geometry.coordinates)
      .setHTML('<div class="marker-popup"><h3>' + feature.properties.name + '</h3><p>Ljudnivå nu:</p><p>Detaljerad info</p></div>')
      .setLngLat(feature.geometry.coordinates)
      .addTo(this.map);*/


  }

  private addMarker(sensor?: Sensor) {
    sensor = this.apiService.testAddSensor;
    this.markers.push(new GeoJson(
      [sensor.lng, sensor.lat], {message: sensor.name}));
    const data = new FeatureCollection(this.markers);
    this.source.setData(data);
  }

  public flyToLocation(sensor: Sensor) {
    this.map.flyTo({center: [sensor.lng, sensor.lat], zoom: 17});
  }

  openSensorDetails(sensor: Sensor) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = sensor;
    const dialogRef = this.dialog.open(MarkerPopupComponent, dialogConfig);
    dialogRef.afterClosed();
  }


}


