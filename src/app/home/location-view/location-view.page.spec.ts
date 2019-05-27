import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationViewPage } from './location-view.page';

describe('LocationViewPage', () => {
  let component: LocationViewPage;
  let fixture: ComponentFixture<LocationViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
