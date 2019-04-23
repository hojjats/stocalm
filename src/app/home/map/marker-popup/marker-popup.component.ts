import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Sensor} from '../../../shared/models/sensor.model';

@Component({
  selector: 'app-marker-popup',
  templateUrl: './marker-popup.component.html',
  styleUrls: ['./marker-popup.component.scss'],
})
export class MarkerPopupComponent implements OnInit {

  sensor: Sensor;

  constructor(public dialogRef: MatDialogRef<MarkerPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Sensor) {
  }

  ngOnInit() {
    this.sensor = this.data;
  }

}
