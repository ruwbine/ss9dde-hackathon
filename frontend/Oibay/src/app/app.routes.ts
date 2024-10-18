import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { MainComponent } from './components/main/main.component';
import { SingUpComponent } from './components/auth/sing-up/sing-up.component';
import { AuthGuard } from './components/auth/auth.guard';
export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'home',component:MainComponent,canActivate:[AuthGuard]},
    {path:'registration',component:SingUpComponent},
    {path: '**', redirectTo: 'login' },

];
