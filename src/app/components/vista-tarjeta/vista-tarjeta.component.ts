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
  public textoBotonUno?:string;

  @Input()
  public textoBotonDos?:string;

  @Input()
  public duoBotones?:boolean;

  @Input()
  public tipoEnvio?:string;

  @Input()
  public codigoProducto?:string;

  @Input()
  public nombreModal?:string;

  @Input()
  public idObjeto?:number;

  @Output() itemNuevo = new EventEmitter<string>();
  emitirValores(){
    let valor:string |undefined = "";
    switch(this.tipoEnvio){
      case "codigoProducto":
        valor = this.codigoProducto;
        break;
      case "nombreProducto":
        valor = this.titulo;
        break;
    }
    this.itemNuevo.emit(valor);
  } 

  @Output() itemModal = new EventEmitter<number>();
  emitirModal(){
    this.itemModal.emit(this.idObjeto);
  }

}
