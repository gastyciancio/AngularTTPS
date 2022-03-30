import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Estado } from '../reservas/estado';
import { ReservaService } from '../reservas/provider-reserva';

@Component({
  selector: 'app-detalle-reserva-de-mi-servicio',
  templateUrl: './detalle-reserva-de-mi-servicio.component.html',
  providers: [ReservaService],
  styleUrls: ['./detalle-reserva-de-mi-servicio.component.css']
})
export class DetalleReservaDeMiServicioComponent implements OnInit {

  constructor(public activatedRoute:ActivatedRoute, private resService: ReservaService) { }

  id:any;
  currentReserva:any;
  currentEstado:any;
  currentFormaPago:any;

  ngOnInit(): void {
    this.id=Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.resService.getReservaById(this.id).subscribe((res)=> this.currentReserva=res)
    this.resService.getStatusOfReserva(this.id).subscribe((sta)=> this.currentEstado=sta)
    this.resService.getFormaPagoOfReserva(this.id).subscribe((fpago)=> this.currentFormaPago=fpago)

  }

  editarEstado(idEstado:any, estado:any): void{
    const nuevo_estado = new Estado(idEstado,estado);
    this.resService.updateStatusOfReserva(idEstado,nuevo_estado).subscribe((data)=>{window.location.reload();});

  }

}
