import {Component, OnInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../../environments/environment';
import {Constants} from '../../shared/constants';
import {Sensor} from '../../shared/models/sensor.model';
import {FeatureCollection, GeoJson} from './geo';
import {GeoJSON} from 'geojson';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lng = 18.040243;
  lat = 59.316087;

  geojson = [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.031952, 38.913184]
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.413682, 37.775408]
      }
    }
  ];

  sensors = Constants.sensors; // Only for testing
  markers = [];

  source: any;
  data: any;


  constructor() {
    mapboxgl.accessToken = environment.mapBoxAccessToken;
  }

  ngOnInit() {
    this.setCurrentLocation();
    this.buildMap();
    this.addLayer();
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

  private buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });

    // this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', (event) => {

      this.map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': [{
              'type': 'Feature',
              'properties': {
                'description': '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
                'icon': 'theatre'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [18.024202, 59.328784]
              }
            }, {
              'type': 'Feature',
              'properties': {
                'description': '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
                'icon': 'theatre'
              },
              'geometry': {
                'type': 'Point',
                'coordinates': [18.035978, 59.313884]
              }
            }]
          }
        },
        'layout': {
          'icon-image': '{icon}-15',
          'icon-allow-overlap': true
        }
      });
    });

    this.map.on('click', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat];
      const newMarker = new GeoJson(coordinates, {message: 'Test'});
      this.markers.push(newMarker);
      console.log(this.markers);

      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = 'black';
      el.style.height = '50px';
      el.addEventListener('click', function() {
        window.alert('Test');
      });

      new mapboxgl.Marker(el).setLngLat(coordinates).addTo(this.map);

    });

  }

  public flyToLocation(sensor: Sensor) {
    this.map.flyTo({center: [sensor.lng, sensor.lat]});
  }

  addLayer() {
    // Add a layer showing the places.

  }


}


