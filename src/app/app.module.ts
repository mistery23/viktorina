import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import { environment } from '../environments/environment';
//
import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminComponent } from './admin/admin.component';
import { LargeScreenComponent } from './large-screen/large-screen.component';
import { UserResultComponent } from './user-result/user-result.component';



const appRoutes: Routes =[
  {path: '', redirectTo: '/user', pathMatch: 'full'},
  {path: 'user', component: UserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'large-screen', component: LargeScreenComponent},
  {path: 'user-result', component: UserResultComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    HeaderComponent,
    AdminComponent,
    LargeScreenComponent,
    UserResultComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
