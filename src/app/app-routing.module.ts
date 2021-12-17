import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NuevoServicioComponent } from './servicios/servicio/newServicio/nuevo-servicio/nuevo-servicio.component';
import { ServicioComponent } from './servicios/servicio/servicio.component';
import { CanActivateViaAuthGuard } from './users/canactivate';
import { EditarUsuarioComponent } from './editarusuario/editarusuario.component';
const routes: Routes = [
  { path:'register',component:RegisterComponent,pathMatch:'full'},
  { path: 'servicios', component: ServicioComponent,pathMatch: 'full',canActivate:[CanActivateViaAuthGuard]},
  { path: 'nuevoServicio', component: NuevoServicioComponent,pathMatch: 'full',canActivate:[CanActivateViaAuthGuard]},
  { path: 'home', component: HomeComponent,pathMatch: 'full',canActivate:[CanActivateViaAuthGuard]},
  { path: 'editar', component: EditarUsuarioComponent,pathMatch: 'full'},
  { path: '**', component: LoginComponent,pathMatch: 'full'},
  


  
       
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
