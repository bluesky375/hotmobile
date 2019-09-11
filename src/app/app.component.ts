import { Component } from '@angular/core';
import { Platform,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { UtilsProvider } from '../providers/utils/utils';
import { RestProvider } from '../providers/rest/rest';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  user:any;
  userToken:any;
  userTokenStartTime:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public utilProvider: UtilsProvider,
    public alertCtrl: AlertController,
    public restProvider: RestProvider,
    ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.user = this.utilProvider.getSessionUser();
      this.userToken = this.utilProvider.getToken();
      this.userTokenStartTime = this.utilProvider.getTokenTime();

      if(this.userToken != undefined && this.userToken != null && this.userTokenStartTime != null && this.user != null) {
        this.rootPage = HomePage;
        let diff = (new Date().getTime() - this.userTokenStartTime) / 1000;
        diff /= 60;
        let exactDiff = Math.abs(Math.round(diff));

        console.log("Token Start Time : " + this.userTokenStartTime);
        console.log("Token completed time : " + exactDiff + " min");

        if(exactDiff < 30 && exactDiff > 25){
          this.restProvider.refreshToken(this.userToken)
          .then((response:any) =>{
            if(response.token != null){
              this.utilProvider.saveToken(response.token);
              this.utilProvider.saveTokenTime(new Date().getTime());
            }
          },error=>{
            this.utilProvider.removeAllLocalStorage();
            this.rootPage = LoginPage;
          });
        }else if(exactDiff >= 30){
            this.utilProvider.showToast("Session Expired, please Login again.","TIMEOUT");
            this.utilProvider.removeAllLocalStorage();
            this.rootPage = LoginPage;
        }
    }else{
      this.utilProvider.removeAllLocalStorage();
      this.rootPage = LoginPage;
    }
    });
  }
}
