import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaService } from '../reservas/provider-reserva';
import { ServicioService } from '../servicios/servicio/newServicio/provider-service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-reservas-of-service',
  templateUrl: './reservas-of-service.component.html',
  providers: [ ServicioService, ReservaService ],
  styleUrls: ['./reservas-of-service.component.css']
})
export class ReservasOfServiceComponent implements OnInit {
  mensaje:string=""
  servicio:any;
  id:any;
  reservas:any[]=[];
  estados:any[]=[];
  formaPagos:any[]=[];

  constructor(private route: ActivatedRoute,private serService: ServicioService,private reservaService: ReservaService,public  http:HttpClient,public router:Router,private location: Location) { }

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'))
    this.serService.getServiceById(this.id).subscribe(data =>{
      this.servicio=data
      this.serService.getReservasforServiceById(this.id).subscribe((reservas: any[]) =>{
        this.reservas=reservas;
      },
      err =>{if(err.status==401) this.router.navigate(['/'])})
    },
    err =>{if(err.status==401) this.router.navigate(['/'])});

  }

  verEstadoOfReserva(id_reserva:any, pos:any):void{
  
      this.reservaService.getStatusOfReserva(id_reserva).subscribe((status)=>{
        this.estados[pos]=status;
    },
    err =>{if(err.status==401) this.router.navigate(['/'])});

  }

  verFormaPagoOfReserva(id_reserva:any, pos:any):void{
    this.reservaService.getFormaPagoOfReserva(id_reserva).subscribe((formaPago)=>{
      this.formaPagos[pos]=formaPago;
    
    },
    err =>{if(err.status==401) this.router.navigate(['/'])});
  }
  

  verDetalle(id:any){
    this.router.navigate(['verDetalleReservaDelServicio',id]);


  }
  back(): void {
    this.location.back()
  }

}
