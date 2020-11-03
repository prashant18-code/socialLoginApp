import { Component } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userData: { email: any; first_name: any; picture: any; username: any; };
  userDataGoogle: any;
  displayProfile: boolean = false;
  displayProfileGoogle: boolean = false;


  constructor(public fb: Facebook, public google: GooglePlus) {}

  fbLogin(){
    // this.fb.login(['public_profile', 'user_friends', 'email']).then((res: FacebookLoginResponse) =>{
    //   console.log('Logged into Facebook!', res);
    // }).catch(e => console.log('Error logging into Facebook', e));

    this.fb.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        console.log('profile: ',profile);
        this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
        console.log('userData');
        this.displayProfile = true;
      });
    }).catch(e => console.log('Error logging into Facebook', e));;
  }

  logOut(){
    this.displayProfile = false;
    this.displayProfileGoogle = false;
    this.userData = { email: '', first_name: '', picture: '', username: ''};
    this.userDataGoogle = undefined;
  }
  googleLogin(){
    this.google.login({}).then(res =>{
      console.log(res);
      this.userDataGoogle = res;
      console.log('userDataGoogle', this.userDataGoogle);
      this.displayProfileGoogle = true;
    }).catch(err => console.error(err));
  }
}
