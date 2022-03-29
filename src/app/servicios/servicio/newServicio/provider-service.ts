import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from './service';
import { UsersService } from 'src/app/users/user.service';
import { Reserva } from 'src/app/reservas/reserva';

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
export class ServicioService {
servicioUrl = 'http://localhost:8080/ttps-spring/servicio'; // URL to web api

constructor(private http: HttpClient,public userService:UsersService) {}

   /** GET servicios of an user from the server */
    getServiciosOfUser (idUser:string): Observable<Service[]> {
        header=header.set("idPersona",this.userService.getToken().split("-",1)[0]);
        httpOptions.headers=header
        header=header.set("token",this.userService.getToken());
        httpOptions.headers=header
        return this.http.get<Service[]>('http://localhost:8080/ttps-spring/usuario/'+idUser+'/servicios',httpOptions)
    }
    

   /** POST: add a new service to the database */
    addService (service: Service): Observable<Service> {
        header=header.set("idPersona",this.userService.getToken().split("-",1)[0]);
        httpOptions.headers=header
        header=header.set("token",this.userService.getToken());
        httpOptions.headers=header
        return this.http.post<Service>(this.servicioUrl, service, httpOptions)
    }

    updateService(service: Service): Observable<Service> {
        return this.http.put<Service>(this.servicioUrl+'/'+service.id, service, httpOptions)
      
    }

    deleteServicePaso1(service: Service): Observable<Service> {
        return this.http.put<Service>(this.servicioUrl+'/borrar/'+service.id, service, httpOptions)
      
    }

    deleteServicePaso2(service: Service): Observable<Service> {
        return this.http.put<Service>(this.servicioUrl+'/borrar2/'+service.id, service, httpOptions)
      
    }

    getServiceById(id_service: any): Observable<Service> {
        return this.http.get<Service>(this.servicioUrl+'/'+id_service, httpOptions)
      
    }

    getReservasforServiceById(id: any): Observable<Reserva[]> {
       
        header=header.set("token",this.userService.getToken());
        httpOptions.headers=header
        header=header.set("idPersona",this.userService.getToken().split("-",1)[0]);
        httpOptions.headers=header
        return this.http.get<Reserva[]>(this.servicioUrl+'/'+id+"/reservas", httpOptions)
      
    }

}
