import {AfterViewChecked, Component, OnInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../environments/environment';
import {Sensor} from '../../shared/models/sensor.model';
import {FeatureCollection, GeoJson} from './geo';
import {ApiService} from '../../shared/services/api.service';
import {MapService} from '../../shared/services/map.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewChecked {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lng = 18.040243;
  lat = 59.316087;

  // data
  source: any;
  markers: any[] = [];

  sensors: Sensor[] = [];


  constructor(public apiService: ApiService,
              private mapService: MapService) {
    mapboxgl.accessToken = environment.mapBoxAccessToken;
  }

  ngOnInit() {
    this.apiService.sensors.forEach(marker => {
      this.markers.push(
        new GeoJson([marker.lng, marker.lat], {message: marker.name})
      );
      this.sensors.push(marker);
    });
    this.setCurrentLocation();
    this.buildMap();
    this.mapService.flyToEmitter.subscribe((sensor: Sensor) => {
      this.flyToLocation(sensor);
    });
  }

  ngAfterViewChecked() {
    this.map.resize();
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


    /*//// Add Marker on Click
    this.map.on('click', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat];
      const newMarker = new GeoJson(coordinates, {message: this.message});
      this.markers.push(newMarker);
      console.log(newMarker);
    });
    */

    /// Add realtime firebase data on map load
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

      /// subscribe to realtime database and set data source

      const data = new FeatureCollection(this.markers);
      this.source.setData(data);


      /// create map layers with realtime data
      this.map.addLayer({
        id: 'stocalm',
        source: 'stocalm',
        type: 'symbol',
        layout: {
          'text-field': '{message}',
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


    /*// Overloading site
    this.sensors.forEach((sensor: Sensor) => {
      const el = document.createElement('div');
      el.innerHTML = '<div class="marker"><i class="fa fa-map-marker" aria-hidden="true"></i><h3></div>' + sensor.name + '</h3>';
      new mapboxgl.Marker(el)
        .setLngLat([sensor.lng, sensor.lat])
        .addTo(this.map);
    });*/

  }

  public flyToLocation(sensor: Sensor) {
    this.map.flyTo({center: [sensor.lng, sensor.lat], zoom: 17});
  }


}


