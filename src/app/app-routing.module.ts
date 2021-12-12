import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicioComponent } from './servicios/servicio/servicio.component';

const routes: Routes = [
 
  { path: 'servicios', component: ServicioComponent,pathMatch: 'full'},

  
       
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
