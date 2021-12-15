import { Component } from "@angular/core";
import {UsersService} from "../users/user.service"
import { Router } from '@angular/router';
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent {
    mensaje:string=""
    email: string=''
    password: string=''
    name:string=''
    username:string=''
    lastname:string=''
  
    constructor(public userService:UsersService, public router:Router) {}
  
    register() {
      if (this.email=="" || this.password=="" || this.name=="" || this.username=="" || this.lastname=="") {  this.mensaje="Complete todos los datos por favor"; return }
      const user ={email:this.email,contraseña:this.password,nombre:this.name,nombre_usuario:this.username,apellido:this.lastname}
      this.userService.register(user).subscribe(data =>{console.log(data)})
      this.router.navigateByUrl('/')
    }
    
  }
