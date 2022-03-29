import { Component } from "@angular/core";
import {UsersService} from "../users/user.service";

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import { ListaServicios } from "../home/home/listaservicios.interface";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ReservaService } from "./provider-reserva";
import { Reserva } from "./reserva";


@Component({
  selector: "app-reservas",
  templateUrl: "./reservas.component.html",
  providers: [ ReservaService ],
  styleUrls: ["./reservas.component.css"]
})
export class ReservasComponent {
  visibleReserva:boolean=false
  mensaje:string='';
  reserva=new Reserva(0," "," "," "," "," ");
  forma_pago:string='';

  servicio:ListaServicios={id:'',nombre:'',tipo:'',descripcion:'',url:'',twitter:'',instagram:'',whatsapp:'',imagen1:'',imagen2:'',imagen3:''}
  id:number=0
  fotos1:any;
  fotos2:any;
  fotos3:any;
  reserva_creada: any;

  constructor(public userService:UsersService, public router:Router,public activatedRoute:ActivatedRoute, public http:HttpClient,
    public sanitizer: DomSanitizer,private resService: ReservaService) {}

  ngOnInit(): void {
     this.id=Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.getAllServices().subscribe(data =>{
      this.servicio=data
      this.fotos1=(this.sanitizer.bypassSecurityTrustUrl(data.imagen1));
      this.fotos2=(this.sanitizer.bypassSecurityTrustUrl(data.imagen2));
      this.fotos3=(this.sanitizer.bypassSecurityTrustUrl(data.imagen3));
      
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
      if (this.reserva.descripcion== "" || this.reserva.fecha==""  || this.reserva.informacion =="" || this.reserva.mail==""|| this.reserva.telefono=="" || this.forma_pago=="") {  this.mensaje="Complete todos los datos por favor"; return }
      const reserva_a_guardar={informacion:this.reserva.informacion,descripcion:this.reserva.descripcion,mail:this.reserva.mail,telefono:this.reserva.telefono,fecha:this.reserva.fecha}
      
      const httph = {
        headers: new HttpHeaders({
          'idPersona': this.userService.getId(),
          'idServicio': String(id)
        }),
      }; 
      const newReserva: Reserva = {
        informacion: this.reserva.informacion,
        mail: this.reserva.mail,
        descripcion: this.reserva.descripcion,
        fecha: this.reserva.fecha,
        telefono:  this.reserva.telefono,
      } as Reserva;

      

      
    
      this.resService.addReserva(newReserva,String(id),this.forma_pago)
      .subscribe(  (res) => {

        this.reserva=new Reserva(0," "," "," "," "," ");
        this.mensaje="Reserva agregada";

 
      },err =>{if(err.status==412) {
          this.mensaje="La fecha ya esta ocupada, por favor elija otra";return
        }else this.mensaje="Reserva agregada";
      });
      
     
    }
    
}

