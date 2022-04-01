import { Component } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import {UsersService} from "../users/user.service";
import { Router } from '@angular/router';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  mensaje:string=''
  user_name: string=''
  password: string=''

  constructor(public userService:UsersService, public router:Router) {}

  login() {
    const httph = {
      headers: new HttpHeaders({
        'usuario': this.user_name,
        'clave':this.password
      }),
    }; 
    
    this.userService.login(httph).subscribe(
      data =>{console.log(data)
              this.userService.setToken(data.token);
              this.userService.setId(data.userid);
              this.router.navigateByUrl('/home');

      }
    , err =>{this.mensaje="Usuario o contraseña incorrectos"; return}
    )
  }
}
