import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaService } from "../reservas/provider-reserva";
import { UsersService } from "../users/user.service";
import { Location } from '@angular/common'

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  providers: [ReservaService,UsersService],
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit {

  mensaje:string=""
  mis_reservas:any[]=[]
  myId:any;


  constructor(private resService:ReservaService,public userService:UsersService,public router:Router,private location: Location) {}

  ngOnInit(): void {
    this.myId=this.userService.getId()
    this.resService.getReservasOfUser(this.myId).subscribe(data =>{
      this.mis_reservas=data;

    });

  }
  back(): void {
    this.location.back()
  }


  
  verDetalleReserva(idReserva:any):void{
    this.router.navigate(['verDetalleMiReserva',idReserva]);

  }
  
}
