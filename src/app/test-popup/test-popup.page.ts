import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'test-popup',
  templateUrl: './test-popup.page.html',
  styleUrls: ['./test-popup.page.scss'],
})
export class TestPopupPage implements OnInit {

  constructor(public apiService: ApiService,
    private socialSharing: SocialSharing,
    private file: File) { }

    shareTwitter(imgUrl?: string) {
      this.socialSharing.shareViaTwitter(null, imgUrl, null).then(() => {
        // Success
      }).catch((e) => {
        // Error!
      });
    }

  ngOnInit() {
  }

}
