import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UsersService {

usuarioUrl = 'http://localhost:8080/ttps-spring/'; // URL to web api
constructor(private http: HttpClient,private cookies: CookieService,private router:Router) {}


  registerReserva(reserva:any,httph:any): Observable<any>{
    return this.http.post(this.usuarioUrl+"reserva",reserva,httph);

  }
  registerFormaPago(formaPago:any,httph:any):Observable<any>{
    return this.http.post(this.usuarioUrl+"formaPago",null,httph)
  }
  register(user: any): Observable<any> {
    return this.http.post(this.usuarioUrl+"usuario", user);
  }
  login(httph: any): Observable<any> {
    return this.http.post(this.usuarioUrl+"autenticacion",null,httph);
  }

  edit(user:any,httph:any):Observable<any>{
    return this.http.put(this.usuarioUrl+'usuario/'+this.getId(),user,httph);
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
    this.router.navigateByUrl('/');
  }
  getUser(){
    const token=this.cookies.get("token");
    const splited=token.split('-');
    const id_user=splited[0];
    const httph = {
      headers: new HttpHeaders({
        'token': token
      })}
    return this.http.get(this.usuarioUrl+"usuario/"+id_user,httph);
  
  }
  getId(){
    const token=this.cookies.get("token");
    const splited=token.split('-');
    const id_user=splited[0];
    return id_user
  }

}