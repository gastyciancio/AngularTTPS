import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/users/user.service';
import { Valoracion } from './valoracion';

let header = new HttpHeaders();
header=header.set( 'Content-Type', 'application/json').set(
'Authorization', 'my-auth-token').set(
'Access-Control-Allow-Origin', '*').set(
'Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS').set(
'Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')

let httpOptions = {
    headers: header
};

@Injectable()
export class ValoracionService {
valoracionUrl = 'http://localhost:8080/ttps-spring/valoracion'; // URL to web api

constructor(private http: HttpClient,public userService:UsersService) {}

   /** POST: add a new service to the database */
    addValoracion (valoracion: Valoracion, idServicio:any, idReserva:any): Observable<Valoracion> {
        header=header.set("idPersona",this.userService.getId());
        httpOptions.headers=header
        header=header.set("token",this.userService.getToken());
        httpOptions.headers=header
        header=header.set("idServicio",idServicio.toString());
        httpOptions.headers=header
        header=header.set("idReserva",idReserva.toString());
        httpOptions.headers=header
        return this.http.post<Valoracion>(this.valoracionUrl, valoracion, httpOptions)
    }

}
