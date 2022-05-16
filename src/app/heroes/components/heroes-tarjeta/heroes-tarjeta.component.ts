import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';

@Component({
  selector: 'app-heroes-tarjeta',
  templateUrl: './heroes-tarjeta.component.html',
  styles: [
    `
    mat-card{
      margin-top:20px;
    }
    `
  ]
})
export class HeroesTarjetaComponent {

  @Input()
  heroe!: Heroe;
}
