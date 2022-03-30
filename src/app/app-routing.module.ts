import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NuevoServicioComponent } from './servicios/servicio/newServicio/nuevo-servicio/nuevo-servicio.component';
import { ServicioComponent } from './servicios/servicio/servicio.component';
import { ReservasComponent } from './reservas/reservas.component';
import { CanActivateViaAuthGuard } from './users/canactivate';
import { EditarUsuarioComponent } from './editarusuario/editarusuario.component';
import { MisReservasComponent } from './mis-reservas/mis-reservas.component';
import { ReservasOfServiceComponent } from './reservas-of-service/reservas-of-service.component';
import { NewValoracionComponent } from './new-valoracion/new-valoracion.component';
import { DetalleReservaDeMiServicioComponent } from './detalle-reserva-de-mi-servicio/detalle-reserva-de-mi-servicio.component';
import { VerDetalleMiReservaComponent } from './ver-detalle-mi-reserva/ver-detalle-mi-reserva.component';
const routes: Routes = [
  { path:'register',component:RegisterComponent,pathMatch:'full'},
  { path: 'servicios', component: ServicioComponent,pathMatch: 'prefix',canActivate:[CanActivateViaAuthGuard]},
  { path: 'reservas',component: MisReservasComponent,pathMatch:'full',canActivate:[CanActivateViaAuthGuard]},
  { path: 'see_reservas/:id', component: ReservasOfServiceComponent,pathMatch: 'full',canActivate:[CanActivateViaAuthGuard]},
  { path: 'create_valoracion/:id', component: NewValoracionComponent,pathMatch: 'full',canActivate:[CanActivateViaAuthGuard]},
  { path: 'create_reserva/:id', component: ReservasComponent,pathMatch: 'full',canActivate:[CanActivateViaAuthGuard]},
  { path: 'nuevoServicio', component: NuevoServicioComponent,pathMatch: 'full',canActivate:[CanActivateViaAuthGuard]},
  { path: 'home', component: HomeComponent,pathMatch: 'full',canActivate:[CanActivateViaAuthGuard]},
  { path: 'editar', component: EditarUsuarioComponent,pathMatch: 'full'},
  { path: 'verDetalleReservaDelServicio/:id', component: DetalleReservaDeMiServicioComponent,pathMatch: 'full'},
  { path: 'verDetalleMiReserva/:id', component: VerDetalleMiReservaComponent,pathMatch: 'full'},
  { path: '**', component: LoginComponent,pathMatch: 'full'},
  


  
       
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
