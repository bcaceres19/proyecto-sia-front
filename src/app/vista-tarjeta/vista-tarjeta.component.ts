import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vista-tarjeta',
  templateUrl: './vista-tarjeta.component.html',
  styleUrls: ['./vista-tarjeta.component.css']
})
export class VistaTarjetaComponent {

  @Input()
  public nombre?:string;

  @Input()
  public precio?:string;

  @Input()
  public stock?:string;

  @Input()
  public estado?:string;
  
  @Input()
  public fechaVencimiento?:string;

  @Input()
  public urlImagen?:string;

  @Input()
  public titulo?:string;

  @Input()
  public fechaInicio?:string;

  @Input()
  public cantidadProductos?:number

  @Input()
  public valorTotal?:number;

}
