import { Sensor } from 'src/app/shared/models/sensor.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from 'src/app/shared/services/api.service';
import { TestBed, inject, getTestBed } from '@angular/core/testing';
import {environment} from './../../../environments/environment';


describe('ApiService', () => {
    let testSensor1;
    let testSensor2;
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let service: ApiService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ApiService],
            imports: [HttpClientTestingModule]
        });

        injector = getTestBed();
        service = injector.get(ApiService);
        httpMock = injector.get(HttpTestingController);

        testSensor1 = {
            readings: [
                {
                date: '2019-10-10',
                time: '23:30',
                value: 40
            }, {
                date: '2019-10-10',
                time: '10:30',
                value: 30
            }] 
        };

        testSensor2 = {
            readings: [
                {
                date: '2019-10-10',
                time: '03:30',
                value: 40
            }, {
                date: '2019-10-10',
                time: '10:30',
                value: 30
            }] 
        };
    });

    afterEach(() => {

    });


    it('should be created', inject([ApiService], (service: ApiService) => {
        expect(service).toBeTruthy();
    }));

    it('should sort readings: first reading newer', inject([ApiService], (service: ApiService) => {
        const newSensor = {
            readings: [
                {
                date: '2019-10-10',
                time: '23:30',
                value: 40
            }, {
                date: '2010-10-10',
                time: '10:30',
                value: 30
            }
        ]};
        service.sortReadings(newSensor);
        expect(newSensor.readings[0].date).toBe('2019-10-10');
    }));


    it('should sort readings: second reading newer', inject([ApiService], (service: ApiService) => {
        const newSensor = {
            readings: [
                {
                date: '2010-10-10',
                time: '23:30',
                value: 40
            }, {
                date: '2019-10-10',
                time: '10:30',
                value: 30
            }
        ]};
        service.sortReadings(newSensor);
        expect(newSensor.readings[0].date).toBe('2019-10-10');
    }));

    it('should sort readings: first reading time newer', inject([ApiService], (service: ApiService) => {
        service.sortReadings(testSensor1);
        expect(testSensor1.readings[0].time).toBe('23:30');
    }));

    it('should sort readings: second reading time newer', inject([ApiService], (service: ApiService) => {
        service.sortReadings(testSensor2);
        expect(testSensor2.readings[0].time).toBe('10:30');
    }));

    it('should sort readings: equally new readings', inject([ApiService], (service: ApiService) => {
        const newSensor = {
            readings: [
                {
                date: '2019-10-10',
                time: '23:30',
                value: 40
            }, {
                date: '2019-10-10',
                time: '23:30',
                value: 30
            }
        ]};
        service.sortReadings(newSensor);
        expect(newSensor.readings[0].value).toBe(40);
    }));

    it('should test GET', () => {
        const dummyData =
            {
                reading: {
                    date: '2019-11-11',
                    time: '11:30',
                    value: 11
                }
            };

        service.getReadingsBySensorId(2).subscribe(reading => {
            expect(reading).toBe(dummyData.reading);
        
        });

        const req = httpMock.expectOne(environment.BASE_URL + 'sensors/2');
        expect(req.request.method).toEqual('GET');

    //   req.flush(dummyData);
    //    httpMock.verify();
    });


    it('should get sensors', () => {
        const dummyData =
            {
                reading: {
                    date: '2019-11-11',
                    time: '11:30',
                    value: 11
                }
            };

        service.getSensors().subscribe(reading => {
            expect(reading).toBe(dummyData.reading);
        });

      //  const req = httpMock.expectOne('http://localhost:8080/api/sensors');
       // expect(req.request.method).toEqual('GET');

    //   req.flush(dummyData);
   // httpMock.verify();
    });

    it('should get weather', () => {
        const dummyData =
            {
                weather: {
                    temp: 17,
                    iconUrl: 'test'
                }
            };

        service.getRealTimeWeather(333, 444).subscribe(weather => {
            expect(weather).toBe(dummyData.weather);
        });

        const req = httpMock.expectOne(environment.BASE_URL + 'weather/now/lng/333/lat/444');
        expect(req.request.method).toEqual('GET');
    });
});
