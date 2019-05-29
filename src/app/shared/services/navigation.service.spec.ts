import {NavigationService} from './navigation.service';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';


describe('NavigationService', () => {
    let testSensor1;
    let testSensor2;
    let injector: TestBed;
    let service: NavigationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NavigationService],
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        service = injector.get(NavigationService);


    });

    it('should toggle places', () => {
        spyOn(service.openPlacesEmitter, 'emit');
        let notOpen = false;
        service.placesIsOpen = notOpen;
        service.togglePlaces();
        expect(service.placesIsOpen).toBe(true);
        expect(service.openPlacesEmitter.emit).toHaveBeenCalledWith(true);

    });

    it('should close places', () => {
        spyOn(service.openPlacesEmitter, 'emit');
        service.closePlaces();
        expect(service.placesIsOpen).toBe(false);
        expect(service.openPlacesEmitter.emit).toHaveBeenCalledWith(false);

    });

    it('should open places', () => {
        spyOn(service.openPlacesEmitter, 'emit');
        service.openPlaces();
        expect(service.placesIsOpen).toBe(true);
        expect(service.openPlacesEmitter.emit).toHaveBeenCalledWith(true);

    });







});
