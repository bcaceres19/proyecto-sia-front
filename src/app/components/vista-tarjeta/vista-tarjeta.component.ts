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
  public urlImagen?:string|null;

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
  public codigoProducto?:string | null;

  @Input()
  public nombreModal?:string;

  @Input()
  public idObjeto?:number | null;

  @Output() itemNuevo = new EventEmitter<string>();
  emitirValores(){
    this.itemNuevo.emit(this.codigoProducto!);
  } 

  @Output() itemAceptar = new EventEmitter<string>();
  emitirAceptar(){
    this.itemAceptar.emit(this.titulo);
  } 

  @Output() itemRechazar = new EventEmitter<string>();
  emitirRechazar(){
    this.itemRechazar.emit(this.titulo);
  } 

  @Output() itemModal = new EventEmitter<number>();
  emitirModal(){
    this.itemModal.emit(this.idObjeto!);
  }

}
