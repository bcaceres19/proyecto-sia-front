import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Inventario } from 'src/app/interface/inventario.interface';
import { TipoProducto } from 'src/app/interface/tipoProducto.interface';
import { InventarioService } from 'src/app/service/inventario.service';
import { ListasService } from 'src/app/service/listas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-producto-inventario',
  templateUrl: './crear-producto-inventario.component.html',
  styleUrls: ['./crear-producto-inventario.component.css'],
})
export class CrearProductoInventarioComponent {
  public errorPrecioProducto: string = '';

  public errorStock: string = '';

  public errorNombreProducto: string = '';

  public errorTipoProducto: string = '';

  public errorUrlImagen: string = '';

  public errorPorcentaje:string = '';
  
  public errorFechaVencimiento:string = '';

  public idRol: string | null;

  public tiposProductos:TipoProducto[] = []

  fechaActual = new Date();

  formCrearInventario: FormGroup<any> = new FormGroup<any>({
    precioProducto: new FormControl('', [Validators.required, Validators.min(1)]),
    stock: new FormControl('', [Validators.required, Validators.min(1)]),
    nombreProducto: new FormControl('', [Validators.required]),
    idTipoProducto: new FormControl('', [Validators.required]),
    urlImagen: new FormControl('', [Validators.required]),
    porcentajeAumento: new FormControl('', [Validators.required, Validators.min(1)]),
    fechaVencimiento: new FormControl('', [Validators.required])
  });

  constructor(private router:Router, private spinner:NgxSpinnerService,
    private service:ListasService, private inventarioService:InventarioService
  ){
    this.idRol = sessionStorage.getItem('rol');
    this.fechaActual.setHours(0, 0, 0, 0);
    this.consultarListas()
    this.precioProducto.valueChanges.subscribe(value => {
      if (value < 0) {
        this.precioProducto.setValue(0);
      }
    });
    this.stock.valueChanges.subscribe(value => {
      if (value < 0) {
        this.stock.setValue(0);
      }else if (value >= 100){
        this.stock.setValue(99)
      }
    });
    this.porcentajeAumento.valueChanges.subscribe(value => {
      if (value < 0) {
        this.porcentajeAumento.setValue(0);
      }else if (value >= 100){
        this.porcentajeAumento.setValue(99)
      }
    });
  }

  get precioProducto() {
    return this.formCrearInventario.get('precioProducto') as FormControl;
  }

  get fechaVencimiento(){
    return this.formCrearInventario.get('fechaVencimiento') as FormControl;
  }

  get stock() {
    return this.formCrearInventario.get('stock') as FormControl;
  }

  get nombreProducto() {
    return this.formCrearInventario.get('nombreProducto') as FormControl;
  }

  get idTipoProducto() {
    return this.formCrearInventario.get('idTipoProducto') as FormControl;
  }

  get urlImagen() {
    return this.formCrearInventario.get('urlImagen') as FormControl;
  }

  get porcentajeAumento(){
    return this.formCrearInventario.get('porcentajeAumento') as FormControl;
  }

  consultarListas() {
    this.spinner.show();
    this.service.consultarTiposProductos().subscribe({
      next: (v) => {
        if (v.listaData !== undefined && v.listaData.length) {
          this.tiposProductos = v.listaData as TipoProducto[];
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

  actualizarErrorMessage() {
    this.errorPrecioProducto = this.precioProducto.hasError('required')
    ? 'Se requiere un precio para el producto'
    : this.precioProducto.hasError('min')
        ? 'El precio debe ser mayor a 0'
        : '';

this.errorPorcentaje = this.porcentajeAumento.hasError('min')
    ? 'El porcentaje debe ser mayor a 0'
    : '';

this.errorStock = this.stock.hasError('required')
    ? 'Se requiere un número de stock para el producto'
    : this.stock.hasError('min')
        ? 'El stock debe ser mayor a 0'
        : '';

this.errorNombreProducto = this.nombreProducto.hasError('required')
    ? 'Se requiere un nombre para el producto'
    : '';

this.errorTipoProducto = this.idTipoProducto.hasError('required')
    ? 'Se requiere definir el tipo del producto'
    : '';

this.errorUrlImagen = this.urlImagen.hasError('required')
    ? 'Se requiere una imagen para el producto'
    : '';

this.errorFechaVencimiento = this.fechaVencimiento.hasError('required')
    ? 'Se requiere una fecha para el vencimiento del producto'
    : '';
  }

  crearInventario() {
    this.inventarioService.verificarInventario(this.nombreProducto.value).subscribe({
      next: (v) => {
        if(v.data as boolean){
          Swal.fire({
            text: "Ya existe un inventario con este nombre. Por favor, ingresa otro nombre.",
            icon: "error"
          });
          
        }else{
          let tipoProducto:TipoProducto = {
            idTipoProducto: this.idTipoProducto.value
          }
          let inventario: Inventario = {
            precioProductoInventario: this.precioProducto.value,
            stockProductoInventario: this.stock.value,
            nombreProductoInventario: this.nombreProducto.value,
            urlImagenProducto: this.urlImagen.value,
            idTipoProductoFk: tipoProducto,
            porcentajeAumentoPrecio: this.porcentajeAumento.value,
            fechaVencimiento: this.fechaVencimiento.value
          };
          this.spinner.show();
          // Verificar si las contraseñas coinciden
          
          this.inventarioService.crearInventario(inventario).subscribe({
              next: (v) => {},
              error: (e) => {
                this.spinner.hide();
                console.log(e);
              },
              complete: () => {
                this.spinner.hide();
                this.router.navigate(['administrador/']);
              },
            });
        }
      },
      error: (e) => {
        this.spinner.hide();
        console.log(e);
      }
    })    
  }

  validarNumero(event:any){
    const input = event.target;
    if (input.value < 0) {
        input.value = '';
    }
  }

  volver(){
    if (this.idRol !== null) {
      this.router.navigate(['administrador/']);
    } else {
      this.router.navigate(['']);
    }
  }
}
