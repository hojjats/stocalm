import {Component, OnInit} from '@angular/core';
import {ToasterService} from '../services/toaster.service';

@Component({
  selector: 'app-toaster-popup',
  templateUrl: './toaster-popup.component.html',
  styleUrls: ['./toaster-popup.component.scss'],
})
export class ToasterPopupComponent implements OnInit {

  constructor(public toasterService: ToasterService) {
  }

  ngOnInit() {
  }

}
