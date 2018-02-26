import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RideComponent } from './ride/ride.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthGuard } from './auth.guard';


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: { appTitle: 'Login to app' }
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'register',
        component: RegisterComponent,
        data: { appTitle: 'Regigster with app' }
    },
    {
        path: 'ride',
        canActivate: [AuthGuard],
        component: RideComponent,
        data: { appTitle: 'Pick a ride' }
    },
    {
        path: '**', component: PageNotFoundComponent 
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}