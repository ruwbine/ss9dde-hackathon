import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { MainComponent } from './components/main/main.component';

import { AuthGuard } from './components/auth/auth.guard';
import { SignupComponent } from './components/auth/signup/signup.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'home',component:MainComponent,canActivate:[AuthGuard]},
    {path:'registration',component:SignupComponent},
    {path: '**', redirectTo: 'login' },

];
