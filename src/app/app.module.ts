import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { UsersPage } from '../pages/users/users';
import { RestProvider } from '../providers/rest/rest';
import { UtilsProvider } from '../providers/utils/utils';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { PopoverComponent } from '../components/popover/popover';
import { MainHeaderComponent } from '../components/main-header/main-header';
import { SideMenuComponent } from '../components/side-menu/side-menu';
import { UserActionPopoverComponent } from '../components/user-action-popover/user-action-popover';
import { SettingsPage }  from '../pages/settings/settings';
import { RolesPage }  from '../pages/roles/roles';
import { CreaterolesPage }  from '../pages/createroles/createroles';
import { DeliveryPage }  from '../pages/delivery/delivery';
import { SearchPipe } from '../pipes/search';
import { AddUserPage }  from '../pages/add-user/add-user';
import { EditUserPage }  from '../pages/edit-user/edit-user';
import { EditrolePage }  from '../pages/editrole/editrole';
import { ModalPage }  from '../pages/modal/modal';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { HomemodalPage }  from '../pages/homemodal/homemodal';
import { RequirementsPage } from '../pages/requirements/requirements';
import { RequirementPopoverComponent } from '../components/requirement-popover/requirement-popover';
import { AddrequirementPage }  from '../pages/addrequirement/addrequirement';
import { ContactmodalPage }  from '../pages/contactmodal/contactmodal';
import { AddcontactmodalPage }  from '../pages/addcontactmodal/addcontactmodal';
import { EditrequirementsPage }  from '../pages/editrequirements/editrequirements';
import { CandidatePage }  from '../pages/candidate/candidate';
import { CandidatePopoverComponent }  from '../components/candidate-popover/candidate-popover';
import { CandidateResponsePage }  from '../pages/candidate-response/candidate-response';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { InterviewModalPage }  from '../pages/interview-modal/interview-modal';
import { CandidateDetailPage }  from '../pages/candidate-detail/candidate-detail';
import { OquestionPage }  from '../pages/oquestion/oquestion';
import { SelfRatingPage }  from '../pages/self-rating/self-rating';
import { QuestionResponsePage }  from '../pages/question-response/question-response';
import { TechnicalQuestionPage }  from '../pages/technical-question/technical-question';
import { GeneralQuestionsPage }  from '../pages/general-questions/general-questions';
import { EditcandidatePage }  from '../pages/editcandidate/editcandidate';
import { CreateCandidatePage }  from '../pages/create-candidate/create-candidate';
import { AddResourcePage }  from '../pages/add-resource/add-resource';
import { TechScreenerPage }  from '../pages/tech-screener/tech-screener';
import { StarRatingModule } from 'ionic3-star-rating';
import { VpSalesPage }  from '../pages/vp-sales/vp-sales';
import { AccManagerPage }  from '../pages/acc-manager/acc-manager';
import { MgrRecruitingPage }  from '../pages/mgr-recruiting/mgr-recruiting';
import { RecruiterPage }  from '../pages/recruiter/recruiter';

import { CloseReqPopoverComponent }  from '../components/close-req-popover/close-req-popover';
import { SubvendorPopoverComponent }  from '../components/subvendor-popover/subvendor-popover';
import { SubvendorPage }  from '../pages/subvendor/subvendor';
import { EditSubvendorPage }  from '../pages/edit-subvendor/edit-subvendor';
import { CreateSubvendorPage }  from '../pages/create-subvendor/create-subvendor';
import { ClientsPage }  from '../pages/clients/clients';
import { ClientPopoverComponent }  from '../components/client-popover/client-popover';
import { EditClientPage }  from '../pages/edit-client/edit-client';
import { ChangeAcntMgrPage }  from '../pages/change-acnt-mgr/change-acnt-mgr';
import { CreateClientPage }  from '../pages/create-client/create-client';
import { CandidateSidePage }  from '../pages/candidate-side/candidate-side';
import { CandidateSidePopoverComponent }  from '../components/candidate-side-popover/candidate-side-popover';
import { CandidateHisModalPage }  from '../pages/candidate-his-modal/candidate-his-modal';
import { CandidateHistoryDetailsPage }  from '../pages/candidate-history-details/candidate-history-details';
import { EditCandidateSidePage }  from '../pages/edit-candidate-side/edit-candidate-side';
import { CreateCandidateSidePage }  from '../pages/create-candidate-side/create-candidate-side';
//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//import { File } from '@ionic-native/file';
import { DisplayQuestionsPage }  from '../pages/display-questions/display-questions';
import { GeneralQuestionPage }  from '../pages/general-question/general-question';
import { AddTechnicalPage }  from '../pages/add-technical/add-technical';
import { AddGeneralPage }  from '../pages/add-general/add-general';
import { EditGeneralModelPage }  from '../pages/edit-general-model/edit-general-model';
import { EditTechnicalModelPage }  from '../pages/edit-technical-model/edit-technical-model';
import { ScreenerListPage }  from '../pages/screener-list/screener-list';
import { ScreenerDetailModalPage }  from '../pages/screener-detail-modal/screener-detail-modal';
import { TechnicalScreenerDetailsPage }  from '../pages/technical-screener-details/technical-screener-details';
import { AccountsPage }  from '../pages/accounts/accounts';
import { AccountsPaidHistoryPage }  from '../pages/accounts-paid-history/accounts-paid-history';
import { PaymentDetailsPage }  from '../pages/payment-details/payment-details';
import { AddCandidateDbPage }  from '../pages/add-candidate-db/add-candidate-db';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { EditCandidateDbPage }  from '../pages/edit-candidate-db/edit-candidate-db';
import { SelectCandidateDbModalPage }  from '../pages/select-candidate-db-modal/select-candidate-db-modal';
import { AddNotesPage }  from '../pages/add-notes/add-notes';
import { ViewAllRecruiterPage }  from '../pages/view-all-recruiter/view-all-recruiter';
import { ViewAllScreenerPage }  from '../pages/view-all-screener/view-all-screener';
import { FeedbackFormPage }  from '../pages/feedback-form/feedback-form';
import { TechnicalDbPage }  from '../pages/technical-db/technical-db';
import { GeneralDbPage }  from '../pages/general-db/general-db';
import { ResourceModalPage }  from '../pages/resource-modal/resource-modal';
import { CsmPage }  from '../pages/csm/csm';


import { DatePickerModule } from 'ion-datepicker';
//import { Calendar } from '@ionic-native/calendar/ngx';

import * as moment from 'moment';



@NgModule({
  declarations: [  
    MyApp,
    HomePage,
    LoginPage, 
    UsersPage,
    SettingsPage,
    PopoverComponent,
    MainHeaderComponent,
    SideMenuComponent,
    RolesPage,
    CreaterolesPage,
    SearchPipe,
    DeliveryPage,
    UserActionPopoverComponent,
    AddUserPage,
    EditUserPage,
    EditrolePage,
    ModalPage,
    HomemodalPage,
   
    RequirementsPage,
    RequirementPopoverComponent,
    AddrequirementPage,
    ContactmodalPage,
    AddcontactmodalPage,
    EditrequirementsPage,
    CandidatePage,
    CandidatePopoverComponent,
    CandidateResponsePage,
    ProgressBarComponent,
    InterviewModalPage,
    CandidateDetailPage,
    OquestionPage,
    SelfRatingPage,
    QuestionResponsePage,
    TechnicalQuestionPage,
    GeneralQuestionsPage,
    EditcandidatePage,
    CreateCandidatePage,
    AddResourcePage,
    TechScreenerPage,
    VpSalesPage,
    AccManagerPage,
    MgrRecruitingPage,
    RecruiterPage ,
    CloseReqPopoverComponent,
    SubvendorPage,
    SubvendorPopoverComponent,
    EditSubvendorPage,
    CreateSubvendorPage,
    ClientsPage,
    ClientPopoverComponent,
    EditClientPage,
    ChangeAcntMgrPage,
    CreateClientPage,
    CandidateSidePage,
    CandidateSidePopoverComponent,
    CandidateHisModalPage,
    CandidateHistoryDetailsPage,
    EditCandidateSidePage,
    CreateCandidateSidePage,
    DisplayQuestionsPage,
    GeneralQuestionPage,
    AddTechnicalPage,
    AddGeneralPage,
    EditGeneralModelPage,
    EditTechnicalModelPage,
    ScreenerListPage,
    ScreenerDetailModalPage,
    TechnicalScreenerDetailsPage,
    AccountsPage,
    AccountsPaidHistoryPage,
    PaymentDetailsPage,
    AddCandidateDbPage,
    EditCandidateDbPage,
    SelectCandidateDbModalPage,
    AddNotesPage,
    ViewAllRecruiterPage,
    ViewAllScreenerPage,
    FeedbackFormPage,
    TechnicalDbPage,
    GeneralDbPage,
    ResourceModalPage,
    CsmPage
  ],

  imports: [ 
    BrowserModule,
    HttpModule,
    HttpClientModule,
    SelectSearchableModule,
    StarRatingModule,
    DatePickerModule,

    IonicModule.forRoot(MyApp ,{}, {
      links: [
              {component: HomePage,  segment: 'home'},
              { component: RolesPage, segment: 'roles' },
              { component: UsersPage, segment: 'users' },
              { component: CreaterolesPage,  segment: 'createroles' },
              { component: AddUserPage,  segment: 'adduser' },
              { component: EditUserPage, segment: 'edituser/:userId' },
              { component: RequirementsPage, segment: 'requirements' },
              { component: AddrequirementPage, segment: 'addrequirements' },
              { component: EditrequirementsPage, segment: 'editrequirements/:clientId' },
              { component: CandidatePage, segment: 'candidate/:reqId' },
              { component: CandidateResponsePage, segment: 'CandidateResponse/:cId/:reqId/:workflowId' },
              { component: CandidateDetailPage, segment: 'CandidateDetails/:cId/:reqId/:workflowId' },
              { component: OquestionPage, segment: 'gen-question/:cId/:reqId/:workflowId' },
              { component: SelfRatingPage, segment: 'ratings/:cId/:reqId/:workflowId' },
              { component: QuestionResponsePage, segment: 'questions/:cId/:reqId/:workflowId' },
              { component: EditcandidatePage, segment: 'editcandidate/:cId/:reqId' },
              { component: CreateCandidatePage, segment: 'createcandidate/:reqId/:workflowId' },
              { component: AddResourcePage, segment: 'addresource/:reqId/:workflowId' },
              { component: TechScreenerPage, segment: 'TechnicalScreener/:reqId' },
              { component: SubvendorPage, segment: 'Subvendor' },
              { component: EditSubvendorPage, segment: 'EditSubvendor/:vId' },
              { component: CreateSubvendorPage, segment: 'CreateSubvendor' },
              { component: ClientsPage, segment: 'Clients' },
              { component: EditClientPage, segment: 'EditClient/:CId' },
              { component: ChangeAcntMgrPage, segment: 'account-manager-Resources/:CId' },
              { component: CreateClientPage, segment: 'CreateClient' },
              { component: CandidateSidePage, segment: 'DisplayCandidate' },
              { component: CandidateHisModalPage, segment: 'CandidateHistory/:canId' },
              { component: EditCandidateSidePage, segment: 'EditCandidate/:canId' },
              { component: CreateCandidateSidePage, segment: 'CreateCandidate' },
              { component: DisplayQuestionsPage, segment: 'DisplayQuestions' },
              { component: GeneralQuestionPage, segment: 'GeneralQuestion' },
              { component: AddTechnicalPage, segment: 'AddTechnical' },
              { component: AddGeneralPage, segment: 'AddGeneral' },
              { component: EditGeneralModelPage, segment: 'EditGeneralQuestion' },
              { component: ScreenerListPage, segment: 'TechnicalScreeners' },
              { component: TechnicalScreenerDetailsPage, segment: 'CreateTechnicalScreener' },
              { component: AccountsPage, segment: 'Accounts' },
              { component: AccountsPaidHistoryPage, segment: 'accounts-paidHistory' },
              { component: PaymentDetailsPage, segment: 'accounts-editAccounts/:reqId/:tsId' },
              { component: EditCandidateDbPage, segment: 'Edit-Candidate/:canId' },
              { component: AddCandidateDbPage, segment: 'requirement-Display-Candidates' },
              { component: ViewAllRecruiterPage, segment: 'ViewAllRecruiters' },
              { component: ViewAllScreenerPage, segment: 'ViewAllScreener' },
              { component: FeedbackFormPage, segment: 'FeedbackForm' },
             
              
              
            ]
        } 
     )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    UsersPage,
    SettingsPage,
    PopoverComponent,
    RolesPage,
    CreaterolesPage,
    DeliveryPage,
    UserActionPopoverComponent,
    AddUserPage,
    EditUserPage,
    EditrolePage,
    ModalPage,
    HomemodalPage,
  
    RequirementsPage,
    RequirementPopoverComponent,
    AddrequirementPage,
    ContactmodalPage,
    AddcontactmodalPage,
    EditrequirementsPage,
    CandidatePage,
    CandidatePopoverComponent,
    CandidateResponsePage,
    ProgressBarComponent,
    InterviewModalPage,
    CandidateDetailPage,
    OquestionPage,
    SelfRatingPage,
    QuestionResponsePage,
    TechnicalQuestionPage,
    GeneralQuestionsPage,
    EditcandidatePage,
    CreateCandidatePage,
    AddResourcePage,
    TechScreenerPage,
    VpSalesPage,
    AccManagerPage,
    MgrRecruitingPage,
    RecruiterPage,
    CloseReqPopoverComponent,
    SubvendorPage,
    SubvendorPopoverComponent,
    EditSubvendorPage,
    CreateSubvendorPage,
    ClientsPage,
    ClientPopoverComponent,
    EditClientPage,
    ChangeAcntMgrPage,
    CreateClientPage,
    CandidateSidePage,
    CandidateSidePopoverComponent,
    CandidateHisModalPage,
    CandidateHistoryDetailsPage,
    EditCandidateSidePage,
    CreateCandidateSidePage,
    DisplayQuestionsPage,
    GeneralQuestionPage,
    AddTechnicalPage,
    AddGeneralPage,
    EditGeneralModelPage,
    EditTechnicalModelPage,
    ScreenerListPage,
    ScreenerDetailModalPage,
    TechnicalScreenerDetailsPage,
    AccountsPage,
    AccountsPaidHistoryPage,
    PaymentDetailsPage,
    AddCandidateDbPage,
    EditCandidateDbPage,
    SelectCandidateDbModalPage,
    AddNotesPage,
    ViewAllRecruiterPage,
    ViewAllScreenerPage,
    FeedbackFormPage,
    TechnicalDbPage,
    GeneralDbPage,
    ResourceModalPage,
    CsmPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    UtilsProvider,
    File,
    FileTransfer,
    DocumentViewer,
    
    
  ]
})
export class AppModule {}
