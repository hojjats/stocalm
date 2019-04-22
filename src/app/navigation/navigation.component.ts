import {Component, OnInit} from '@angular/core';
import {NavigationService} from '../shared/services/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {

  constructor(private navigationService: NavigationService) {
  }

  ngOnInit() {
  }

  togglePlaces() {
    this.navigationService.togglePlacesEmitter.emit();
  }

}
