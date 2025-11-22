import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { WelcomeComponent } from './components/welcome/welcome';

export const routes: Routes = [
    { path:'login', component:LoginComponent},
    { path:'register', component:RegisterComponent},
    { path:'welcome', component:WelcomeComponent}
];
