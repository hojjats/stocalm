import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TopBarComponent } from './top-bar.component';
import { Sensor } from 'src/app/shared/models/sensor.model';
import { Subject, Observable } from 'rxjs';
import {Weather} from '../../../shared/models/weather.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { HttpClient } from '@angular/common/http';



class MockApiService {
  private subject = new Subject();
  getRealTimeWeather() {
    return this.subject.asObservable();
  }
}

describe('TopBarComponent', () => {
 // let injector: TestBed;
  let component: TopBarComponent;
 // let service: ApiServiceStub;
  let httpMock: HttpTestingController;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ TopBarComponent ],
      providers: [
        {provide: ApiService, useClass: MockApiService},
      //  {provide: HttpClient, useClass: HttpClientTestingModule}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  xit ('should getWeather from user location', () => {
    const num1 = 59.4073541;
    const num2 = 17.9455219;
    console.log('I TESTET');
    const apiService = fixture.debugElement.injector.get(ApiService);
    //const serv = TestBed.get(ApiService);
    spyOn(apiService, 'getRealTimeWeather');
    component.getWeather(num1, num2);
    expect(apiService.getRealTimeWeather).toHaveBeenCalledWith(num1, num2);
  });

  });
