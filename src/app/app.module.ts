import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegistarComponent } from './components/registar/registar.component';
import { FriendsComponent } from './components/friends/friends.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FormComponent } from './components/friends/form/form.component';
import { GrupoComponent } from './components/grupo/grupo.component';
import { HandleResponseCodesComponent } from './components/handle-response-codes/handle-response-codes.component';
import { OutrascontasComponent } from './components/outrascontas/outrascontas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    RegistarComponent,
    FriendsComponent,
    ExpensesComponent,
    HomePageComponent,
    FormComponent,
    GrupoComponent,
    HandleResponseCodesComponent,
    OutrascontasComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
