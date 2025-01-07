import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MisionComponent } from './components/mision/mision.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AdmisionsComponent } from './components/admisions/admisions.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { eventListeners } from '@popperjs/core';
import { EventsComponent } from './components/events/events.component';
import { EventsAcademicComponent } from './components/events-academic/events-academic.component';

export const routes: Routes = [
    {path:"",component:HomeComponent, pathMatch:'full'},
    {path:"mision",component:MisionComponent, pathMatch:'full'},
    {path:"footer",component:FooterComponent, pathMatch:'full'},
    {path:"header",component:HeaderComponent, pathMatch:'full'},
    {path:"admisions",component:AdmisionsComponent, pathMatch:'full'},
    {path:"register",component:RegisterComponent, pathMatch:'full'},
    {path:"login",component:LoginComponent, pathMatch:'full'},
    {path:"activateAccount/:email/:activationCode",component:ActivateAccountComponent, pathMatch:'full'},
    {path:"dashboard",component:DashboardComponent, pathMatch:"full"},
    {path:"users",component:UsersComponent, pathMatch:"full"},
    {path:"events",component:EventsComponent, pathMatch:"full"},
    {path:"eventsAcademic",component:EventsAcademicComponent, pathMatch:"full"}
];
