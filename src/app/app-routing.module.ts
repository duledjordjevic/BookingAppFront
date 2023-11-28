import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LogInComponent } from './layout/log-in/log-in.component';
import { RegisterComponent } from './layout/register/register.component';

const routes: Routes = [
  {path : "home", component : HomeComponent},
  {path:"login", component: LogInComponent},
  {path:"register", component: RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
