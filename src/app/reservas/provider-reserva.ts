import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from './reserva';
import { UsersService } from 'src/app/users/user.service';

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
export class ReservaService {
reservaUrl = 'http://localhost:8080/ttps-spring/reserva'; // URL to web api

constructor(private http: HttpClient,public userService:UsersService) {}

   /** GET reservas of an user from the server */
    getReservasOfUser (idUser:string): Observable<Reserva[]> {
        header=header.set("idPersona",this.userService.getToken().split("-",1)[0]);
        httpOptions.headers=header
        header=header.set("token",this.userService.getToken());
        httpOptions.headers=header
        return this.http.get<Reserva[]>('http://localhost:8080/ttps-spring/usuario/'+idUser+'/servicios',httpOptions)
    }
    

   /** POST: add a new reserva to the database */
    addReserva (reserva: Reserva, idServicio:any): Observable<Reserva> {
        header=header.set("idPersona",this.userService.getToken().split("-",1)[0]);
        httpOptions.headers=header
        header=header.set("token",this.userService.getToken());
        httpOptions.headers=header
        header=header.set("idServicio",idServicio);
        httpOptions.headers=header
        return this.http.post<Reserva>(this.reservaUrl, reserva, httpOptions)
    }

    updateReserva(reserva: Reserva): Observable<Reserva> {
        return this.http.put<Reserva>(this.reservaUrl+'/'+reserva.id, reserva, httpOptions)
      
    }

    deleteReserva(reserva: Reserva): Observable<Reserva> {
        return this.http.put<Reserva>(this.reservaUrl+'/borrar/'+reserva.id, reserva, httpOptions)
      
    }

    

}