import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from './service';

const httpOptions = {
 headers: new HttpHeaders({
 'Content-Type': 'application/json',
 'Authorization': 'my-auth-token',
 'idPersona': '1',
 'token':'1-123456',
 'Access-Control-Allow-Origin': '*',
 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
 }),
};

@Injectable()
export class ServicioService {
servicioUrl = 'http://localhost:8080/ttps-spring/servicio'; // URL to web api

constructor(private http: HttpClient) { }

   /** GET servicios of an user from the server */
    getServiciosOfUser (idUser:string): Observable<Service[]> {
    return this.http.get<Service[]>('http://localhost:8080/ttps-spring/usuario/'+idUser+'/servicios',httpOptions)
    }
    

   /** POST: add a new service to the database */
    addService (service: Service): Observable<Service> {
        return this.http.post<Service>(this.servicioUrl, service, httpOptions)
    }

    updateService(service: Service): Observable<Service> {
        return this.http.put<Service>(this.servicioUrl+'/'+service.id, service, httpOptions)
      
    }

}