import { Component } from "@angular/core";
import {UsersService} from "../users/user.service";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import { ListaServicios } from "../home/home/listaservicios.interface";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServicioComponent } from "../servicios/servicio/servicio.component";
import { Reserva } from "./reserva.interface";
@Component({
  selector: "app-reservas",
  templateUrl: "./reservas.component.html",
  styleUrls: ["./reservas.component.css"]
})
export class ReservasComponent {
  visibleReserva:boolean=false
  mensaje:string=''
  reserva:Reserva={id:'',descripcion:'',informacion:'',fecha:'',mail:'',telefono:''}
  servicio:ListaServicios={id:'',nombre:'',tipo:'',descripcion:'',url:'',twitter:'',instagram:'',whatsapp:'',imagen1:'',imagen2:'',imagen3:''}
  id:number=0

  constructor(public userService:UsersService, public router:Router,public activatedRoute:ActivatedRoute, public http:HttpClient) {}

  ngOnInit(): void {
     this.id=Number(this.activatedRoute.snapshot.paramMap.get('id'))
    console.log(this.id)
    this.getAllServices().subscribe(data =>{
      this.servicio=data
      
      console.log(this.servicio)
      
    })
    }


    getAllServices():Observable<ListaServicios>{
      let id_string=String(this.id)
      let dir="http://localhost:8080/ttps-spring/servicio/"+id_string;
      return this.http.get<ListaServicios>(dir)
  
    }
    reservarServicio(id:any){
      this.visibleReserva=true
  
  
    }
    cancelarReserva(id:any){
      this.visibleReserva=false
    }

    registrarReserva(id:any){
      if (this.reserva.descripcion== "" || this.reserva.fecha==""  || this.reserva.informacion =="" || this.reserva.mail==""|| this.reserva.telefono=="") {  this.mensaje="Complete todos los datos por favor"; return }
      const reserva_a_guardar={informacion:this.reserva.informacion,descripcion:this.reserva.descripcion,mail:this.reserva.mail,telefono:this.reserva.telefono,fecha:this.reserva.fecha}
      console.log(reserva_a_guardar)

      
      const httph = {
        headers: new HttpHeaders({
          'idPersona': this.userService.getId(),
          'idServicio': String(id)
        }),
      }; 
      
      this.userService.registerReserva(reserva_a_guardar,httph).subscribe(data =>{console.log(data);this.router.navigate(['home']);}, err =>{this.mensaje="ERROR";return})
    }
    
}

