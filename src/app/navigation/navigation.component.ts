import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationService} from '../shared/services/navigation.service';
import {NavigationStart, Router} from '@angular/router';
import {MapService} from '../shared/services/map.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router,
              public mapService: MapService,
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

  onToggleFollowUser() {
    this.mapService.centerMapByUserState = !this.mapService.centerMapByUserState;
    this.mapService.followUserEmitter.emit(this.mapService.centerMapByUserState);
  }

}
