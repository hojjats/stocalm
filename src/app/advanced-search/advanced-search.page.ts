import { Component, OnInit } from '@angular/core';
import {ApiService} from '../shared/services/api.service';
import {Sensor} from '../shared/models/sensor.model';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.page.html',
  styleUrls: ['./advanced-search.page.scss'],
})
export class AdvancedSearchPage implements OnInit {
  filteredsensors: Sensor[];
  decibel: any;
  min: any = 0;
  max: any = 140;
  min2: any;
  max2: any;

  constructor(public apiservice: ApiService) {
  }

  ngOnInit() {
    this.decibel = 140;
    this.min2 = this.min;
    this.max2 = this.max;
  }

  change() {
    this.min2 = this.decibel.lower;
    this.max2 = this.decibel.upper;
  }

  filter() {

  }
}
