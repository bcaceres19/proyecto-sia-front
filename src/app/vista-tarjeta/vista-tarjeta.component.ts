import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  
  @Input()
  public textoBoton?:string;

  @Input()
  public textoBotonDos?:string;

  @Input()
  public duoBotones?:boolean;

  @Input()
  public codigoProducto?:string;


  @Output() newItemEven = new EventEmitter<string>();
  emitirCodigoProduct(value:string){
    this.newItemEven.emit(value);
  }

  @Output() codigoProdRechazar = new EventEmitter<string>();
  emitirCodigoProductRechazar(value:string){
    this.codigoProdRechazar.emit(value);
  }

}
