import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

let header = new HttpHeaders();
header=header.set( 'Content-Type', 'application/json').set(
'Authorization', 'my-auth-token').set(
'Access-Control-Allow-Origin', '*').set(
'Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS').set(
'Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')

let httpOptions = {
  headers: header
 };

@Injectable({
  providedIn: "root"
})
export class UsersService {

usuarioUrl = 'http://localhost:8080/ttps-spring/'; // URL to web api
constructor(private http: HttpClient,private cookies: CookieService,private router:Router) {}


  registerReserva(reserva:any,httph:any): Observable<any>{
    header=header.set("idPersona",this.getId());
    httpOptions.headers=header
    header=header.set("token",this.getToken());
    httpOptions.headers=header
    return this.http.post(this.usuarioUrl+"reserva",reserva,httpOptions);

  }
  registerFormaPago(formaPago:any,httph:any):Observable<any>{
    header=header.set("idPersona",this.getId());
    httpOptions.headers=header
    header=header.set("token",this.getToken());
    httpOptions.headers=header
    return this.http.post(this.usuarioUrl+"formaPago",null,httpOptions)
  }
  register(user: any): Observable<any> {
    header=header.set("idPersona",this.getId());
    httpOptions.headers=header
    header=header.set("token",this.getToken());
    httpOptions.headers=header
    return this.http.post(this.usuarioUrl+"usuario", user);
  }
  login(httph: any): Observable<any> {
    return this.http.post(this.usuarioUrl+"autenticacion",null,httph);
  }

  edit(user:any,httph:any):Observable<any>{
    header=header.set("idPersona",this.getId());
    httpOptions.headers=header
    header=header.set("token",this.getToken());
    httpOptions.headers=header
    return this.http.put(this.usuarioUrl+'usuario/'+this.getId(),user,httpOptions);
  }

  setId(id: any) {
    this.cookies.set("user_id", id);
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }
  isLogged(){
    if(this.cookies.get('token')){
      return true
    }
    else{
      return false
    }
  }
  logOut(){
    this.getUser();
    this.cookies.delete("token");
    this.cookies.delete("user_id");
    this.router.navigateByUrl('/');
  }
  getUser(){
    header=header.set("idPersona",this.getId());
    httpOptions.headers=header
    header=header.set("token",this.getToken());
    httpOptions.headers=header

    const id_user=this.cookies.get("user_id")
    
    return this.http.get(this.usuarioUrl+"usuario/"+id_user,httpOptions);
  
  }
  getId(){
    const id_user=this.cookies.get("user_id");
    return id_user
  }

}