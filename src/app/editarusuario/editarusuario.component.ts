import { Component, OnInit } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import {UsersService} from "../users/user.service";
import { Router } from '@angular/router';
import { Usuario } from "./usuario";
@Component({
  selector: "app-editarusuario",
  templateUrl: "./editarusuario.component.html",
  styleUrls: ["./editarusuario.component.css"]
})
export class EditarUsuarioComponent implements OnInit{
    mensaje:string=''
    email: string=''
    password: string=''
    name:string=''
    username:string=''
    lastname:string=''
    x:any
    model= new Usuario(0," "," "," "," ");

  constructor(public userService:UsersService, public router:Router) {}
  
  ngOnInit(): void {
    this.userService.getUser().subscribe(
        data =>{this.x=data;console.log(this.x);
          })// aca esta la data del usuario
        this.model= JSON.parse(this.x);
        console.log(this.model);
        
      
    }
  
  


  editar() {

    if (this.email=="" || this.password=="" || this.name=="" || this.username=="" || this.lastname=="") {  this.mensaje="Complete todos los datos por favor"; return }
      const user ={email:this.email,contraseña:this.password,nombre:this.name,nombre_usuario:this.username,apellido:this.lastname}
    console.log(this.x)
    const httph = {
        headers: new HttpHeaders({
          'token': this.userService.getToken()
        }),
      }; 

    this.userService.edit(user,httph).subscribe(
      data =>{console.log(data);this.mensaje="Se ha cambiado su informacion";return }
    , err =>{this.mensaje="El mail/nombre de usuario ya existe"; return}
    )
  }
}