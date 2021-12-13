import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/loginRegister/login.component';
import { NuevoServicioComponent } from './servicios/servicio/newServicio/nuevo-servicio/nuevo-servicio.component';
import { ServicioComponent } from './servicios/servicio/servicio.component';

const routes: Routes = [
 
  { path: 'servicios', component: ServicioComponent,pathMatch: 'full'},
  { path: 'nuevoServicio', component: NuevoServicioComponent,pathMatch: 'full'},
  { path: 'home', component: HomeComponent,pathMatch: 'full'},
  { path: '**', component: LoginComponent,pathMatch: 'full'},
 

  
       
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
