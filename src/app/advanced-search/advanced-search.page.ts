import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FilterService} from '../shared/services/filter.service';
import {IonRange} from '@ionic/angular';
import {Filters} from '../shared/constants';
import {NavigationStart, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.page.html',
  styleUrls: ['./advanced-search.page.scss'],
})
export class AdvancedSearchPage implements OnInit, OnDestroy {

  @ViewChild('decibelMeanValueRange') decibelMeanValueInput: IonRange;
  @ViewChild('latestDecibelRange') latestDecibelInput: IonRange;

  openFilterState = this.filterService.activeFilters.length > 0;

  subscriptions: Subscription[] = [];


  constructor(public filterService: FilterService,
              private router: Router) {
  }

  ngOnInit() {
    // Subscribe to switching page
    const subscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.setToInitState();
      }
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  setToInitState() {
    this.openFilterState = this.filterService.activeFilters.length > 0;
    if (this.filterService.tempFiltration === this.filterService.filteredSensors) {
      this.filterService.tempFiltration = this.filterService.filteredSensors;
    } else {
      this.clearFilters();
    }
  }

  onToggleFilterForm() {
    this.openFilterState = !this.openFilterState;
    if (!this.openFilterState) {
      this.clearFilters();
    }
  }

  onSubmit() {
    this.filterService.applyFilters();
    this.router.navigate(['/']);
  }

  onFormChange() {
    setTimeout(() => {
      this.setFilterByLatestDecibel();
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

  onClearFilters() {
    this.clearFilters();
    this.router.navigate(['/']);
  }

  setFilterByLatestDecibel() {
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
  }
}
