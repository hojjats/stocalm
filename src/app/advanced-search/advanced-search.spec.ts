import {NO_ERRORS_SCHEMA} from '@angular/core';
import {AdvancedSearchPage} from './advanced-search.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {FilterService} from '../shared/services/filter.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router} from '@angular/router';
import { Subject } from 'rxjs';

class MockSensors {
  private subject = new Subject();
}

class MockFilterService extends FilterService{
    tempFiltration = [];
    filteredSensors = [];
    activeFilters = [];
}


describe('AdvancedSearchPage', () => {
    let component: AdvancedSearchPage;
    let service: MockFilterService;
    let sensor: MockSensors;
    beforeEach(() => {
        sensor = new MockSensors();
        service = new MockFilterService(null, null);
      component = new AdvancedSearchPage(service, null);
    });

  xit('should do setToInitState', () => {
    component.setToInitState();
    expect(service.tempFiltration).toEqual(service.filteredSensors);

  });
});
