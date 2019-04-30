import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterMapPage } from './center-map.page';

describe('CenterMapPage', () => {
  let component: CenterMapPage;
  let fixture: ComponentFixture<CenterMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterMapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
