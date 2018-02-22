import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RideComponent } from './ride/ride.component';


const routes: Routes = [
    
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch : 'full'
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'ride',
        component: RideComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}