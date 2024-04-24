import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Inventario } from 'src/app/interface/inventario.interface';
import { InventarioRespuesta } from 'src/app/interface/inventarioRespuesta.interface';
import { Producto } from 'src/app/interface/producto.interface';
import { TipoProducto } from 'src/app/interface/tipoProducto.interface';
import { ListasService } from 'src/app/service/listas.service';
import { ProductoService } from 'src/app/service/producto.service';
import { TipoEstadoProducto } from 'src/app/shared/tipoEstadoProducto.enum';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {

  estadosProducto: String[] = [];

  tiposProducto: InventarioRespuesta[] = [];

  errorPrecioProducto:string = "";

  errorEstadoProducto:string = "";

  errorFechaVencimiento:string = "";

  errorCantidad:string = "";

  errorTipoProducto:string = "" ;

  public idRol: string | null;

  fechaActual = new Date();

  formCrearProducto: FormGroup<any> = new FormGroup<any>({
    precioProducto: new FormControl('', [Validators.required]),
    fechaVencimientoProducto: new FormControl('', [Validators.required]),
    estadoProducto: new FormControl('', [Validators.required]),
    tipoProducto: new FormControl('', [Validators.required]),
    cantidad: new FormControl('', [Validators.required])
  });

  constructor(private router:Router, private spinner:NgxSpinnerService,
    private serviceList:ListasService, private productoService:ProductoService
  ){
    this.idRol = sessionStorage.getItem('rol');
    this.consultarListas()
    this.fechaActual.setHours(0, 0, 0, 0);
    this.precioProducto.valueChanges.subscribe(value => {
      if (value < 0) {
        this.precioProducto.setValue(0);
      }
    });
    this.cantidad.valueChanges.subscribe(value => {
      if (value < 0) {
        this.cantidad.setValue(0);
      }else if(value >= 100){
        this.cantidad.setValue(99);
      }
    });
  }

  get precioProducto(){
    return this.formCrearProducto.get('precioProducto') as FormControl;
  }

  get fechaVencimientoProducto(){
    return this.formCrearProducto.get('fechaVencimientoProducto')as FormControl;
  }

  get estadoProducto(){
    return this.formCrearProducto.get('estadoProducto')as FormControl;
  }

  get cantidad(){
    return this.formCrearProducto.get('cantidad')as FormControl;
  }

  get tipoProducto(){
    return this.formCrearProducto.get('tipoProducto')as FormControl;
  }

  actualizarErrorMessage() {
    this.errorPrecioProducto = this.precioProducto.hasError('required')
        ? 'Se requiere un precio para el producto'
        : '';
    this.errorEstadoProducto = this.estadoProducto.hasError('required')
        ? 'Se requiere definir el estado del producto'
        : '';
    this.errorFechaVencimiento = this.fechaVencimientoProducto.hasError('required')
        ? 'Se requiere una fecha para el vencimiento del producto'
        : '';
    this.errorCantidad = this.cantidad.hasError('required')
        ? 'Se requiere definir la cantidad del producto'
        : '';
    this.errorTipoProducto = this.tipoProducto.hasError('required')
    ? 'Se requiere definir un tipo para el producto producto'
    : '';
  }

  consultarListas() {
    this.spinner.show();
    this.serviceList.consultarTiposInventario().subscribe({
      next: (v) => {
        if (v.listaData !== undefined && v.listaData.length) {
          this.tiposProducto = v.listaData as InventarioRespuesta[];
        }
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
        if(!this.estadosProducto.length){
          this.spinner.hide();
        }
      },
    });

    this.serviceList.consultarEstadosProductos().subscribe({
      next: (v) => {
        if (v.listaData !== undefined && v.listaData.length) {
          this.estadosProducto = v.listaData as String[];
        }
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  crearProducto(){
    this.spinner.show()
    let producto:Producto = {
      precioProducto: this.precioProducto.value,
      fechaVencimientoProducto: this.fechaVencimientoProducto.value,
      estadoProducto:  this.tipoEstadoProducto(this.estadoProducto.value),
      idInventarioFk: {
        idInventario: this.tipoProducto.value
      }
    }
    let error:Boolean = false;
    for(let cant = 0; cant<this.cantidad.value; cant++){
      this.productoService.crearProducto(producto).subscribe({
          next:(v)=>{},
          error:(e) => {
            console.error(e)
            error = true;
          },complete:() =>{}
      })
      if(error){
        this.spinner.hide()
        break
      }
    }
    
  }

  private tipoEstadoProducto(estadoNombre:string):string{
    let estado = "";
    switch(estadoNombre){
      case "Fresco":
         estado = "F"
        break;
      case "Vencido":
        estado = "V";
        break;
      case "Por Vencer":
        estado = "PV";
        break;  
      }
      return estado;
    }


  volver(){
    this.router.navigate(['administrador/']);
  }


}
