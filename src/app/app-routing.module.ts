import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistarComponent } from './components/registar/registar.component';
import { FriendsComponent } from './components/friends/friends.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  {path: "", component : HomeComponent},
  {path: "registar", component : RegistarComponent},
  {path: "login", component : LoginComponent},
  {path: "home",component: HomePageComponent},
  {path: "friends",component: FriendsComponent},
  {path: "expenses",component: ExpensesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
