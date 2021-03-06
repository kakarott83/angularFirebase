import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { TravelComponent } from './travel/travel.component';
import { TravelListComponent } from './travel-list/travel-list.component';
import { TravelService } from './shared/travel.service';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { CustomerComponent } from './customer/customer.component';
import { SettingsComponent } from './settings/settings.component';
import { ReasonComponent } from './reason/reason.component';
import { CountryComponent } from './country/country.component';
import { ReasonListComponent } from './reason-list/reason-list.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [
    AppComponent,
    TravelComponent,
    TravelListComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    
    CustomerComponent,
    SettingsComponent,
    ReasonComponent,
    CountryComponent,
    ReasonListComponent,
    CountryListComponent,
    CustomerListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.fireBaseConfig),
    AngularFirestoreModule,
    FlexLayoutModule,
    NgbModule
  ],

  providers: [TravelService, {provide: LOCALE_ID, useValue: 'de'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
