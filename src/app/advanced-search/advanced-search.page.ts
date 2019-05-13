import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FilterService} from '../shared/services/filter.service';
import {IonRange} from '@ionic/angular';
import {Filters} from '../shared/constants';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.page.html',
  styleUrls: ['./advanced-search.page.scss'],
})
export class AdvancedSearchPage implements OnInit, OnDestroy {

  @ViewChild('decibelMeanValueRange') decibelMeanValueInput: IonRange;
  @ViewChild('latestDecibelRange') latestDecibelInput: IonRange;

  constructor(public filterService: FilterService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.filterService.tempFiltration === this.filterService.filteredSensors) {
      this.filterService.tempFiltration = this.filterService.filteredSensors;
    } else {
      this.clearFilters();
    }
  }

  onSubmit() {
    this.filterService.applyFilters();
  }

  onFormChange() {
    setTimeout(() => {
      this.setFilterByDecibel();
      this.setFilterByDistance();
      this.setFilterByTodayMeanValue();
      this.filterService.updateTempFiltration(this.filterService.form);
    }, 50);
  }

  clearForm() {
    this.filterService.form.reset({
      'latestDecibel': {lower: 0, upper: 100},
      'decibelMeanValue': {lower: 0, upper: 100}
    });
  }

  clearFilters() {
    this.filterService.reset();
    this.clearForm();
  }

  setFilterByDecibel() {
    const minValue = this.filterService.form.get('latestDecibel').value.lower;
    const maxValue = this.filterService.form.get('latestDecibel').value.upper;

    // Check if decibel filter is active and get index
    const index = this.filterService.activeFilters.indexOf(Filters.LATEST_DECIBEL_VALUE);


    // If no min or max value is set, don't filter
    if (minValue === this.latestDecibelInput.min && maxValue === this.latestDecibelInput.max) {
      if (index >= 0) {
        this.filterService.activeFilters.splice(index, 1);
      }
      // Else add decibel to active filters if it isn't already
    } else {
      if (index < 0) {
        this.filterService.activeFilters.push(Filters.LATEST_DECIBEL_VALUE);
      }
    }
  }

  setFilterByDistance() {
    const index = this.filterService.activeFilters.indexOf(Filters.DISTANCE);
    if (!!this.filterService.form.get('distance').value) {
      if (index < 0) {
        this.filterService.activeFilters.push(Filters.DISTANCE);
      }
    } else {
      if (index >= 0) {
        this.filterService.activeFilters.splice(index, 1);
      }
    }
  }


  setFilterByTodayMeanValue() {
    const minValue = this.filterService.form.get('decibelMeanValue').value.lower;
    const maxValue = this.filterService.form.get('decibelMeanValue').value.upper;

    // Check if decibel filter is active and get index
    const index = this.filterService.activeFilters.indexOf(Filters.TODAY_DECIBEL_MEAN_VALUE);


    // If no min or max value is set, don't filter
    if (minValue === this.decibelMeanValueInput.min && maxValue === this.decibelMeanValueInput.max) {
      if (index >= 0) {
        this.filterService.activeFilters.splice(index, 1);
      }
      // Else add decibel to active filters if it isn't already
    } else {
      if (index < 0) {
        this.filterService.activeFilters.push(Filters.TODAY_DECIBEL_MEAN_VALUE);
      }
    }


}}
