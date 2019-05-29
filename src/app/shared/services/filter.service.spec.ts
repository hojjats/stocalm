import { Sensor } from 'src/app/shared/models/sensor.model';
import { FilterService } from 'src/app/shared/services/filter.service';
import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {MapService} from './map.service';
import { map } from 'rxjs/operators';
import {ApiService} from './api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Filters } from '../constants';

describe('FilterService', () => {
    let testSensor1;
    let testSensor2;
    let injector: TestBed;
    let service: FilterService;
    let mapService: MapService;
    let apiService: ApiService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FilterService, MapService],
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        service = injector.get(FilterService);
        mapService = injector.get(MapService);
        apiService = injector.get(ApiService);

    });

    it('shoult convert deg to rad', () => {
        let num = 70;
        let result = service.deg2rad(num);
        expect(result).toBeCloseTo(1.2217);
    });

    it('should calculate distance correctly', () => {
        let lng1 = 59.380936;
        let lat1 = 17.947606;
        let lng2 = 59.379454;
        let lat2 = 17.963129;

       let result = service.calcDistance(lng1, lat1, lng2, lat2);
       expect(result).toBeCloseTo(1.73);
       expect(result).not.toBe(null);
    });


    it('should reset active filters', () => {
        spyOn(service, 'applyFilters');
        service.reset();
        expect(service.activeFilters.length).toBe(0);
        expect(service.applyFilters).toHaveBeenCalled();
    });


    it('should update values from filter', () => {
    spyOn(service, 'filterByDistance');
    spyOn(service, 'filterByLatestDecibelValue');
    spyOn(service, 'filterByTodayMeanValue');
​
    let testFormGroup = new FormGroup({
      'latestDecibel': new FormControl({lower: 0, upper: 100}),
      'decibelMeanValue': new FormControl({lower: 0, upper: 100}),
      'distance': new FormControl(null)
     });
​
     service.activeFilters = [Filters.DISTANCE, Filters.LATEST_DECIBEL_VALUE, Filters.TODAY_DECIBEL_MEAN_VALUE];
​
     service.updateTempFiltration(testFormGroup);
​
     expect(service.filterByDistance).toHaveBeenCalled();
     expect(service.filterByLatestDecibelValue).toHaveBeenCalled();
     expect(service.filterByTodayMeanValue).toHaveBeenCalled();

    });
});
