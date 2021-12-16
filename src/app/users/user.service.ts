import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class UsersService {

usuarioUrl = 'http://localhost:8080/ttps-spring/'; // URL to web api
constructor(private http: HttpClient,private cookies: CookieService) {}

  register(user: any): Observable<any> {
    return this.http.post(this.usuarioUrl+"usuario", user);
  }
  login(httph: any): Observable<any> {
    return this.http.post(this.usuarioUrl+"autenticacion",null,httph);
  }
  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }
}