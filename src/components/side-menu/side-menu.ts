import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { UsersPage } from '../../pages/users/users';
import { HomePage } from '../../pages/home/home';
import { RolesPage } from '../../pages/roles/roles';
import { RequirementsPage } from '../../pages/requirements/requirements';
import { SubvendorPage }  from '../../pages/subvendor/subvendor';
import { ClientsPage }  from '../../pages/clients/clients';
import { CandidateSidePage }  from '../../pages/candidate-side/candidate-side';
import { DisplayQuestionsPage }  from '../../pages/display-questions/display-questions';

import {App} from 'ionic-angular';
import { ScreenerListPage }  from '../../pages/screener-list/screener-list';
import { AccountsPage }  from '../../pages/accounts/accounts';


/**
 * Generated class for the SideMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */  
@Component({
  selector: 'side-menu',
  templateUrl: 'side-menu.html'
})
export class SideMenuComponent { 
  activeTab:string='DASHBOARD';
  constructor(public menuCtrl: MenuController,public app: App) {
  }

  gotoState(stateName:string){
    console.log(stateName);
    this.activeTab = stateName;
    this.menuCtrl.close();
    if(stateName === 'USERS'){  
      this.app.getActiveNav().setRoot(UsersPage);
    }else if(stateName === 'DASHBOARD'){
      this.app.getActiveNav().setRoot(HomePage);
    }else if(stateName === 'ROLES'){
      this.app.getActiveNav().setRoot(RolesPage);
    }else if(stateName === 'REQUIREMENTS'){
      this.app.getActiveNav().setRoot(RequirementsPage);
    }else if(stateName === 'SUBVENDORS'){
      this.app.getActiveNav().setRoot(SubvendorPage);
    }else if(stateName === 'CLIENTS'){
      this.app.getActiveNav().setRoot(ClientsPage);
    }else if(stateName === 'CANDIDATES'){
      this.app.getActiveNav().setRoot(CandidateSidePage);
    }else if(stateName === 'SCREENERS'){
      this.app.getActiveNav().setRoot(ScreenerListPage);
    }else if(stateName === 'QUESTIONS'){
      this.app.getActiveNav().setRoot(DisplayQuestionsPage);
    }else if(stateName === 'ACCOUNTS'){
      this.app.getActiveNav().setRoot(AccountsPage);
    }
  }

}
