import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminComponent } from './admin/admin.component';
import { LargeScreenComponent } from './large-screen/large-screen.component';
import {UserService} from "./services/user.service";
import {FormsModule} from "@angular/forms";
import { HeaderUserComponent } from './components/header-user/header-user.component';
import {AuthGuard} from "./guards/auth.guard";
import {LengthOfArrayPipe} from "./pipes/length-of-array";
import { AnswerDirective } from './directives/answer.directive';
import {HttpClientModule} from "@angular/common/http";

const appRoutes: Routes =[
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'user', component: UserComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'large-screen', component: LargeScreenComponent},
  { path: '**', redirectTo: '/user'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    HeaderComponent,
    AdminComponent,
    LargeScreenComponent,
    HeaderUserComponent,
    LengthOfArrayPipe,
    AnswerDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
