import { LogPublishersServiceService } from './../../projects/ngj-logger/src/lib/log-publishers-service.service';
import { NgjLoggerService } from './../../projects/ngj-logger/src/lib/ngj-logger.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { MessageService } from './services/message.service';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { ConfigurationService } from './services/configuration.service';
import { LogService } from './services/log.service';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { LogsComponent } from './components/logs/logs.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { ExceptionService } from './services/exception.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { ChartsModule } from 'ng2-charts';
import { SearchComponent } from './components/search/search.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up',  component: SignupComponent },
  {
    path: 'admin',
    component: HomeComponent,
    children: [
      {
        path: 'home',
        component: AdminHomeComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'search',
        component: SearchComponent,
        canActivate: [AuthGuardService]
      },
        {
          path: 'viewlogs',
          component: LogsComponent,
          canActivate: [AuthGuardService]
        }
    ]

  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    LogsComponent,
    AdminHomeComponent,
    ProfileComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    LogService,
    ConfigurationService,
    ExceptionService,
    HttpErrorHandler,
    MessageService,
    AuthenticationService,
    AuthGuardService,
    NgjLoggerService,
    LogPublishersServiceService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
