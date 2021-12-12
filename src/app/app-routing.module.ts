import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoServicioComponent } from './servicios/servicio/newServicio/nuevo-servicio/nuevo-servicio.component';
import { ServicioComponent } from './servicios/servicio/servicio.component';

const routes: Routes = [
 
  { path: 'servicios', component: ServicioComponent,pathMatch: 'full'},
  { path: 'nuevoServicio', component: NuevoServicioComponent,pathMatch: 'full'},

  
       
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
