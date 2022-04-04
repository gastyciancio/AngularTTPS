import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from '../reservas/estado';
import { ReservaService } from '../reservas/provider-reserva';
import { Location } from '@angular/common'

@Component({
  selector: 'app-detalle-reserva-de-mi-servicio',
  templateUrl: './detalle-reserva-de-mi-servicio.component.html',
  providers: [ReservaService],
  styleUrls: ['./detalle-reserva-de-mi-servicio.component.css']
})
export class DetalleReservaDeMiServicioComponent implements OnInit {

  constructor(public activatedRoute:ActivatedRoute, private resService: ReservaService,private location: Location,private router: Router) { }

  id:any;
  currentReserva:any;
  currentEstado:any;
  currentFormaPago:any;

  ngOnInit(): void {
    this.id=Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.resService.getReservaById(this.id).subscribe(
      (res)=> {this.currentReserva=res},
      err =>{ if(err.status==401) this.router.navigate(['/'])})

    this.resService.getStatusOfReserva(this.id).subscribe(
      (sta)=> {this.currentEstado=sta},
      err =>{ if(err.status==401) this.router.navigate(['/'])})
      
    this.resService.getFormaPagoOfReserva(this.id).subscribe(
      (fpago)=> {this.currentFormaPago=fpago},
      err =>{ if(err.status==401) this.router.navigate(['/'])})

  }

  editarEstado(idEstado:any, estado:any): void{
    const nuevo_estado = new Estado(idEstado,estado);
    this.resService.updateStatusOfReserva(idEstado,nuevo_estado).subscribe(
      (data)=>{window.location.reload();},
      err =>{ if(err.status==401) this.router.navigate(['/'])})

  }
  back(): void {
    this.location.back()
  }

}
