import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicioComponent } from './servicios/servicio/servicio.component';
import { NuevoServicioComponent } from './servicios/servicio/newServicio/nuevo-servicio/nuevo-servicio.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CookieService } from 'ngx-cookie-service';
import { EditarUsuarioComponent } from './editarusuario/editarusuario.component';
@NgModule({
  declarations: [
    AppComponent,
    ServicioComponent,
    NuevoServicioComponent,
    HomeComponent,
    EditarUsuarioComponent,
    RegisterComponent,
    LoginComponent
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
