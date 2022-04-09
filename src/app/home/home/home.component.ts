import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users/user.service';
import { ListaServicios} from "src/app/home/home/listaservicios.interface"
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  servicios:ListaServicios[]=[]
  servicios_aux:ListaServicios[]=[]
  filtroTipo:any="";
  filtroNombre:any="";

  constructor(public user:UsersService,public  http:HttpClient,public router:Router) { }
  
  ngOnInit(): void {

    this.getAllServices().subscribe(data =>{
      this.servicios=data
      this.servicios_aux=data
    },
    err =>{ if(err.status==401) this.router.navigate(['/'])})
  }
  
  filtrarServiciosPorTipo():void{
    this.resetearTabla()
    this.servicios=this.servicios.filter(servicio => servicio.tipo==this.filtroTipo);

  }

  buscarServiciosPorNombre():void{
    this.resetearTabla()
    this.servicios=this.servicios.filter(servicio => servicio.nombre==this.filtroNombre);

  }

  resetearTabla():void{
    this.servicios=this.servicios_aux
   
  }
  

  logOut(){
    this.user.logOut()
  }

  getAllServices():Observable<ListaServicios[]>{

    let header = new HttpHeaders();
    header=header.set( 'Content-Type', 'application/json').set(
    'Authorization', 'my-auth-token').set(
    'Access-Control-Allow-Origin', '*').set(
    'Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS').set(
    'Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')

    let httpOptions = {
        headers: header
      };

    header=header.set("idPersona",this.user.getId());
    httpOptions.headers=header
    header=header.set("token",this.user.getToken());
    httpOptions.headers=header
    
    let dir="http://localhost:8080/ttps-spring/servicio";
    return this.http.get<ListaServicios[]>(dir,httpOptions)

  }

  reservarServicio(id:any){
    this.router.navigate(['create_reserva',id]);


  }

}
