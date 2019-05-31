import {NO_ERRORS_SCHEMA} from '@angular/core';
import {AdvancedSearchPage} from './advanced-search.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {FilterService} from '../shared/services/filter.service';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { Router} from '@angular/router';
import { Subject } from 'rxjs';
import {IonRange} from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { tick } from '@angular/core/src/render3';

describe('AdvancedSearchPage', () => {
    let component: AdvancedSearchPage;
    let injector: TestBed;
    let service: FilterService;
    let router: Router;
    beforeEach(() => {
      jasmine.clock().install();
      TestBed.configureTestingModule({
        providers: [AdvancedSearchPage, FilterService],
        imports: [HttpClientTestingModule, RouterTestingModule]
    });
    injector = getTestBed();
    component = injector.get(AdvancedSearchPage);
    service = injector.get(FilterService);
    router = injector.get(Router);
    });

    afterEach(function() {
      jasmine.clock().uninstall();
    });

  it('should untoggle filter form', () => {
      spyOn(component, 'clearFilters');
      component.openFilterState = true;
      component.onToggleFilterForm();
      expect(component.clearFilters).toHaveBeenCalled();
  });

  it('should clear filters', () => {
    spyOn(component, 'clearForm');
    spyOn(service, 'reset');
    component.clearFilters();
    expect(component.clearForm).toHaveBeenCalled();
    expect(service.reset).toHaveBeenCalled();
});

it('should clear filter 2', () => {
  spyOn(component, 'clearFilters');
  component.onClearFilters();
  expect(component.clearFilters).toHaveBeenCalled();
});


it('should clear forms', () => {
  spyOn(service.form, 'reset');
  component.clearForm();
  expect(service.form.reset).toHaveBeenCalled();
});

it('should set on submit', () => {
  let path = '';
  spyOn(service, 'applyFilters');
  spyOn(router, 'navigate');
  component.onSubmit();
  expect(service.applyFilters).toHaveBeenCalled();
  expect(router.navigate).toHaveBeenCalledWith(['/']);
});

it('should push subscription', () => {
  spyOn(component.subscriptions, 'push');
  component.ngOnInit();
  expect(component.subscriptions.push).toHaveBeenCalled();
});

it('should clear filter', () => {
  spyOn(component, 'clearFilters');
  component.setToInitState();
  expect(component.clearFilters).toHaveBeenCalled();
});

});
