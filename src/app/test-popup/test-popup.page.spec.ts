import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPopupPage } from './test-popup.page';

describe('TestPopupPage', () => {
  let component: TestPopupPage;
  let fixture: ComponentFixture<TestPopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPopupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
