import { pipe } from '@angular-devkit/schematics/node_modules/rxjs/Rx';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { ShopListComponent } from './shop-list/shop-list.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RouteService } from 'app/route.service';
import { CreateShopownerComponent } from './create-shopowner/create-shopowner.component';
import { PromotionComponent } from './promotion/promotion.component';

import { DataListModule, CheckboxModule, FileUploadModule, CalendarModule, DropdownModule,GrowlModule ,AccordionModule } from 'primeng/primeng';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { UploadFormComponent } from './uploads/upload-form/upload-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ShopListComponent,
    UserComponent,
    LoginComponent,
    CreateShopownerComponent,
    PromotionComponent,
    UploadFormComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CheckboxModule,
    CalendarModule,
    AngularFireModule.initializeApp(environment.firebase, 'Coffee Hub'),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    DropdownModule,
    CalendarModule,
    FileUploadModule,
    GrowlModule,
    AccordionModule,

  ],
  providers: [LoginComponent, RouteService,NotificationsComponent,MessageService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
