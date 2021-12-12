import { Component, OnInit } from '@angular/core';
import { Evento } from '../modelos/evento';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})

export class EventosComponent implements OnInit {

eventos: Evento[] = [{'nombre':'Cosquín Rock 2019', 'lugar':'Aeroclub Santa María de Punilla', 'fecha':'02-10-2019'}, {'nombre':'Arctic Monkeys en Argentina', 'lugar':'Hipódromo de San Isidro',
'fecha':'03-30-2019'},{'nombre':'Lollapalooza Argentina', 'lugar':'Hipódromo de San Isidro', 'fecha':'04-05-2019'}, {'nombre':'Iron Maiden en Argentina',
'lugar':'Estadio Vélez Sársfield', 'fecha':'10-12-2019'}];
constructor() {}
ngOnInit() {}
}

