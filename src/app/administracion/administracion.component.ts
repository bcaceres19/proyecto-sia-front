import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../service/producto.service';
import { ProductoInterface } from '../interface/productoRespuesta.interface';
import { Producto } from '../interface/producto.interface';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit{

  public productos:ProductoInterface[] = [];

  ngOnInit(): void {
    this.consultarProductos();
  }

  constructor(private productoService:ProductoService){}
 
  registrarProductoVenta(codigoProducto:string){
    let idUsuario:string | null = sessionStorage.getItem("id"); 
    this.productoService.crearVentaProducto(codigoProducto, idUsuario).subscribe({
      next:(v) => {},
      error:(e) => console.error(e),
      complete:() => console.log("Se completo")       
    })
  }

  public consultarProductos(){
    this.productoService.productosActuales('POST_ORDEN').subscribe(
      {
        next:(v) => {
          if(v.listaData !== undefined && v.listaData.length){
              this.productos = v.listaData as ProductoInterface[];
          }
        },
        error:(e) => console.error(e),
        complete:() => console.log("Se completo")          
      }
    )
  }

  public organizarData(orden:string){
    this.productoService.productosActuales(orden).subscribe(
      {
        next:(v) => {
          if(v.listaData !== undefined && v.listaData.length){
              this.productos = v.listaData as ProductoInterface[];
          }
        },
        error:(e) => console.error(e),
        complete:() => console.log("Se completo")          
      }
    )
  }

}
