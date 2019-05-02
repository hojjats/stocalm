import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  defaultPosition = {
    bottom: '3em',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  showToaster = false;
  message: string;
  position: any;
  toasterType: string;

  constructor() {
    this.position = this.defaultPosition;
  }

  onShowToaster(message: string, toasterType: string, position?: any) {
    this.message = message;
    if (!!toasterType) {
      this.toasterType = toasterType;
    }
    if (!!position) {
      this.position = position;
    }
    this.showToaster = true;

  }

  setDefaultValues() {
    this.showToaster = false;
    this.position = this.defaultPosition;
    this.message = undefined;
    this.toasterType = undefined;
  }

}
