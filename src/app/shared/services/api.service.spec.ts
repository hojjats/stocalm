import { Sensor } from 'src/app/shared/models/sensor.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from 'src/app/shared/services/api.service';
import { TestBed, inject } from '@angular/core/testing';


describe('ApiService', () => {
    let testSensor1;
    let testSensor2;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ApiService],
            imports: [HttpClientTestingModule]
        });

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








});
