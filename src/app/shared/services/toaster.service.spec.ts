import { ToasterService } from './toaster.service';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, TestRequest } from '@angular/common/http/testing';


describe('ToasterService', () => {
    let testSensor1;
    let testSensor2;
    let injector: TestBed;
    let service: ToasterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ToasterService],
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        service = injector.get(ToasterService);

    });

    it('should show toaster', () => {
        let defaultPosition;
        defaultPosition = {
            bottom: '3em',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          };
          let message = 'hello';
          let type = 'something';
          service.onShowToaster(message, type, defaultPosition);
          expect(service.message).toBe(message);
          expect(service.showToaster).toBeTruthy();
          expect(service.toasterType).toBe(type);
          expect(service.position).toBe(defaultPosition);
    });

    it('should set default values', () => {
          service.setDefaultValues();
          expect(service.message).toBe(undefined);
          expect(service.showToaster).toBe(false);
          expect(service.toasterType).toBe(undefined);
          expect(service.position).toBe(service.defaultPosition);
    });
});
