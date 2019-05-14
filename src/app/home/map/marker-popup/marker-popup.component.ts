import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Sensor} from '../../../shared/models/sensor.model';
import {MapService} from '../../../shared/services/map.service';
import {ApiService} from '../../../shared/services/api.service';
import {Weather} from '../../../shared/models/weather.model';
import {Subscription} from 'rxjs';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-marker-popup',
  templateUrl: './marker-popup.component.html',
  styleUrls: ['./marker-popup.component.scss'],
})
export class MarkerPopupComponent implements OnInit, OnDestroy {

  sensor: Sensor;

  popupOpen = false;
  popupImgUrl: string;

  weather: Weather;

  subscriptions: Subscription[] = [];

  constructor(public dialogRef: MatDialogRef<MarkerPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Sensor,
              public mapService: MapService,
              private apiService: ApiService,
              private socialSharing: SocialSharing) {
  }

  ngOnInit() {
    this.sensor = this.data;
    const subscription1 = this.apiService.getRealTimeWeather(this.sensor.coords.lng, this.sensor.coords.lat)
      .subscribe((weather: Weather) => {
        this.weather = weather;
      });
    this.subscriptions.push(subscription1);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  onShowDirection() {
    this.mapService.initiateDirections.emit(this.sensor);
    this.close();
  }

  generateCurrentDecibel(db: number) {
    if (db < 50) {
      return 'low';
    }
    if (db >= 50 && db < 66) {
      return 'middle';
    }
    if (db > 65) {
      return 'high';
    }
  }

  close() {
    this.dialogRef.close();
  }

  togglePopupImg(imgUrl?: string) {
    if (this.popupOpen) {
      this.popupImgUrl = undefined;
    } else {
      this.popupImgUrl = imgUrl;
    }
    this.popupOpen = !this.popupOpen;
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
