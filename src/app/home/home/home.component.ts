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

  constructor(public user:UsersService,public  http:HttpClient,public router:Router) { }
  
  ngOnInit(): void {

    this.getAllServices().subscribe(data =>{
      console.log(data)
      this.servicios=data
    })
  }
  
  
  

  logOut(){
    this.user.logOut()
  }

  getAllServices():Observable<ListaServicios[]>{
    
    let dir="http://localhost:8080/ttps-spring/servicio";
    return this.http.get<ListaServicios[]>(dir)

  }

  reservarServicio(id:any){
    this.router.navigate(['creeate_reservas',id]);


  }

  

}
