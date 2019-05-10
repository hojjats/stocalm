import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Sensor} from '../../../shared/models/sensor.model';
import {MapService} from '../../../shared/services/map.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-marker-popup',
  templateUrl: './marker-popup.component.html',
  styleUrls: ['./marker-popup.component.scss'],
})
export class MarkerPopupComponent implements OnInit {

  sensor: Sensor;

  popupOpen = false;
  popupImgUrl: string;

  constructor(public dialogRef: MatDialogRef<MarkerPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Sensor,
              public mapService: MapService,
              private socialSharing: SocialSharing) {
  }

  ngOnInit() {
    this.sensor = this.data;
  }

  shareTwitter() {
    this.socialSharing.shareViaTwitter('This is a text', null, null).then(() => {
      // Success
    }).catch((e) => {
      // Error!
    });
  }

  shareFacebook() {
    this.socialSharing.shareViaFacebook('This is a text', null, null).then(() => {
      // Success
    }).catch((e) => {
      // Error!
    });
  }

  onShowDirection() {
    this.mapService.initiateDirections.emit(this.sensor);
    this.close();
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

}
