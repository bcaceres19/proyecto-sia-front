import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vista-tarjeta',
  templateUrl: './vista-tarjeta.component.html',
  styleUrls: ['./vista-tarjeta.component.css']
})
export class VistaTarjetaComponent {

  @Input()
  public descripcionTarjet?:string;

  @Input()
  public urlImagen?:string;

}
