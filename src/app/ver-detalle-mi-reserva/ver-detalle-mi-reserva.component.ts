import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { ReservaService } from '../reservas/provider-reserva';

@Component({
  selector: 'app-ver-detalle-mi-reserva',
  templateUrl: './ver-detalle-mi-reserva.component.html',
  providers: [ReservaService],
  styleUrls: ['./ver-detalle-mi-reserva.component.css']
})
export class VerDetalleMiReservaComponent implements OnInit {
  id:any;
  current_reserva:any;
  current_estado:any;
  current_service:any;

  constructor(public activatedRoute:ActivatedRoute,public router:Router,private location: Location,private resService:ReservaService) { }

  ngOnInit(): void {
    this.id=Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.resService.getReservaById(this.id).subscribe(data =>{
      this.current_reserva=data;
      this.resService.getStatusOfReserva(data.id).subscribe((status)=>{this.current_estado=status},  err =>{if(err.status==401) this.router.navigate(['/'])});
      this.resService.getServicesFromReserva(data.id).subscribe((ser)=>{this.current_service=ser},  err =>{if(err.status==401) this.router.navigate(['/'])});

    },
    err =>{if(err.status==401) this.router.navigate(['/'])});

   
  }

  valorarServicio(idServicio:any):void{
    this.router.navigate(['create_valoracion',idServicio]);
  }

  back(): void {
    this.location.back()
  }

}
