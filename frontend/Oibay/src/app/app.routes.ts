import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './components/auth/auth.guard';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/body/home/home.component';
import { Component } from '@angular/core';
import { SettingsComponent } from './components/body/settings/settings.component';
import { DashboardComponent } from './components/body/dashboard/dashboard.component';
import { StatisticsComponent } from './components/body/statistics/statistics.component';
import { MediaComponent } from './components/body/media/media.component';

export const routes: Routes = [
    { path: 'auth/login', component: LoginComponent }, // Маршрут для Auth
    { path: 'auth/registration', component: SignupComponent }, // Маршрут для Auth
    { 
      path: '', 
      component: DashboardComponent, 
      children: [
        { path: 'home', component: HomeComponent },
        { path: 'settings', component: SettingsComponent },
        { path: 'history', component: StatisticsComponent },
        { path: 'account', component: MediaComponent },
        { path: '', redirectTo: 'home', pathMatch: 'full' } 
      ]
    },
    { path: '**', redirectTo: 'home' } 
];
