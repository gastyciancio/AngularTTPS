import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicioComponent } from './servicios/servicio/servicio.component';
import { ReservasComponent } from './reservas/reservas.component';
import { NuevoServicioComponent } from './servicios/servicio/newServicio/nuevo-servicio/nuevo-servicio.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CookieService } from 'ngx-cookie-service';
import { EditarUsuarioComponent } from './editarusuario/editarusuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import { ReservasOfServiceComponent } from './reservas-of-service/reservas-of-service.component';
import { MisReservasComponent } from './mis-reservas/mis-reservas.component';
import { NewValoracionComponent } from './new-valoracion/new-valoracion.component';
import { DetalleReservaDeMiServicioComponent } from './detalle-reserva-de-mi-servicio/detalle-reserva-de-mi-servicio.component';
@NgModule({
  declarations: [
    AppComponent,
    ServicioComponent,
    ReservasComponent,
    NuevoServicioComponent,
    HomeComponent,
    EditarUsuarioComponent,
    RegisterComponent,
    LoginComponent,
    ReservasOfServiceComponent,
    MisReservasComponent,
    NewValoracionComponent,
    DetalleReservaDeMiServicioComponent
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, MatNativeDateModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
