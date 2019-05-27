import {Component, OnInit} from '@angular/core';

import {Sensor} from '../../shared/models/sensor.model';
import {MapService} from '../../shared/services/map.service';
import {Weather} from '../../shared/models/weather.model';
import {ApiService} from '../../shared/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Constants} from '../../shared/constants';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';


@Component({
    selector: 'app-location-view',
    templateUrl: './location-view.page.html',
    styleUrls: ['./location-view.page.scss'],
})
export class LocationViewPage implements OnInit {
    sensors: Sensor[];
    openedSensor: Sensor;
    weather: Weather;
    lat: number;
    lng: number;
    amenities = Constants.AMENITIES_TRANSLATION;
    activeState: any;

    constructor(private mapService: MapService,
                private apiService: ApiService,
                private router: Router,
                private route: ActivatedRoute,
                private socialSharing: SocialSharing) {
    }

    ionViewWillEnter() {
        this.sensors = this.apiService.sensors;
        if (this.apiService.sensors.length < 1) {
            this.apiService.sensors$.subscribe((sensors: Sensor[]) => {
                this.sensors = sensors;
                this.lat = Number(this.route.snapshot.paramMap.get('lat'));
                this.lng = Number(this.route.snapshot.paramMap.get('lng'));
                this.getSensor(this.lat, this.lng);
                this.getWeather();
            });
        } else {
            this.lat = Number(this.route.snapshot.paramMap.get('lat'));
            this.lng = Number(this.route.snapshot.paramMap.get('lng'));
            this.getSensor(this.lat, this.lng);
            this.getWeather();
        }

        this.activeState = 'info';
        console.log(this.sensors);
    }

    ngOnInit() {

    }

    print() {
        this.getSensor(this.lat, this.lng);
        console.log(this.openedSensor);
    }

    getSensor(lat: number, lng: number) {
        this.sensors.forEach(sensor => {
            if (sensor.coords.lng === lng && sensor.coords.lat === lat) {
                this.openedSensor = sensor;
            }
        });
    }

    private getWeather() {
        this.apiService.getRealTimeWeather(this.lng, this.lat)
            .subscribe((weather: Weather) => {
                this.weather = weather;
            });
    }

    shareTwitter() {
        // Need Twitter on Device.
        this.socialSharing.shareViaTwitter(null, null, null).then(() => {
        }).catch((e) => {
        });
    }

    shareFacebook() {
        // Need Facebook on Device.
        this.socialSharing.shareViaFacebook(null, null, null).then(() => {
        }).catch((e) => {
        });
    }

    shareInstagram() {
        // Need Instagram on Device.
        this.socialSharing.shareViaInstagram(null, null).then(() => {
        }).catch((e) => {
        });
    }

    shareSms() {
        this.socialSharing.shareViaSMS(null, null).then(() => {
        }).catch((e) => {
        });
    }
}
