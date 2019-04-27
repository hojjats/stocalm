import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Sensor} from '../../../shared/models/sensor.model';
import {MapService} from '../../../shared/services/map.service';

@Component({
  selector: 'app-marker-popup',
  templateUrl: './marker-popup.component.html',
  styleUrls: ['./marker-popup.component.scss'],
})
export class MarkerPopupComponent implements OnInit {

  sensor: Sensor;

  constructor(public dialogRef: MatDialogRef<MarkerPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Sensor,
              public mapService: MapService) {
  }

  ngOnInit() {
    this.sensor = this.data;
  }

  onShowDirection() {
    this.mapService.initiateDirections.emit(this.sensor);
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

}
