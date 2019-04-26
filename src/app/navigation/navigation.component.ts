import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationService} from '../shared/services/navigation.service';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router,
              public navigationService: NavigationService) {
  }

  ngOnInit() {
  }

  togglePlaces() {
    if (!(this.router.url === '/home')) {
      this.router.navigateByUrl('/home').then(value => {
        this.navigationService.openPlaces();
      });
    } else {
      this.navigationService.togglePlaces();
    }

  }

  closePlaces() {
    this.navigationService.closePlaces();
  }

  test() {
    this.navigationService.centerMapToUserLocation.emit(true);
  }

}
