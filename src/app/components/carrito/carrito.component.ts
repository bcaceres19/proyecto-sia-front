import { Component, OnInit } from '@angular/core';
import { VentaProductoRespuesta } from '../../interface/ventaProductoRespuesta.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from '../../interface/producto.interface';
import { VentaService } from '../../service/venta.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Venta } from '../../interface/venta.interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

    public productosVenta!:VentaProductoRespuesta;

    suscripcion:Subscription = new Subscription()

    public dataSource!:MatTableDataSource<Producto>;

    public precioTotalVenta!:number;

    public cantidadVenta!:number;


    public nombreColumnas:string[] = ['codigo', 'precio', 'estado', "acciones"]

    ngOnInit(): void {
      this.consultarProductosVenta();
      this.suscripcion = this.inventarioService.refresh$.subscribe(() => {        
        this.consultarProductosVenta()
      })
    }

    constructor(private inventarioService:VentaService, private spinner: NgxSpinnerService){
    }

    public consultarProductosVenta(){
      
      let idUsuario:number = Number.parseInt(sessionStorage.getItem("id")!.toString());
      this.spinner.show()
      this.inventarioService.serviceVentaUsuario(idUsuario).subscribe(
        {
          next:(v) => {
            if(v.data !== undefined && v.data !== null){
              this.productosVenta = v.data as VentaProductoRespuesta;
              if(this.productosVenta.productos){
                this.precioTotalVenta = 0;
                this.cantidadVenta = 0;
                this.dataSource = new MatTableDataSource
              }
              this.precioTotalVenta = this.productosVenta.venta.precioTotalVenta;              
              this.cantidadVenta =this.productosVenta.venta.cantidadVenta;
              this.dataSource = new MatTableDataSource<Producto>(this.productosVenta.productos);
            }
          },
          error:(e) => {
            console.error(e)
            this.spinner.hide()
          },
          complete:() => this.spinner.hide()
          
        }
      )

    }

    public realizarVentaConfirmado(){
      this.spinner.show()
      this.inventarioService.serviceRealizarVentaConfirmada(this.productosVenta.venta).subscribe(
        {
          next:(v) => {
            if(!v){
              Swal.fire({
                text:"No se pudo realizar la compra, comunicate con el administrador",
                icon: "error"
              })
            }
            this.precioTotalVenta=0
            this.cantidadVenta = 0;
            this.dataSource = new MatTableDataSource
          },
          error:(e) => {
            this.spinner.hide()
            Swal.fire({
              text:"No se pudo realizar la compra, comunicate con el administrador",
              icon: "error"
            })
            console.error(e)
          },
          complete:() => this.spinner.hide()          
        }
      )
    }

    public eliminarProductoCarrito(idVentaProducto:number){
      this.spinner.show()
      this.inventarioService.serviceEliminarProductoUsuario(idVentaProducto).subscribe(
        {
          next:(v) => {
            if(!v){
              this.spinner.hide()
              Swal.fire({
                text:"No se pudo eliminar el producto de la venta, comunicate con el administrador",
                icon: "error"
              })
            }
          },
          error:(e) => {
            this.spinner.hide()
            Swal.fire({
              text:"No se pudo eliminar el producto de la venta, comunicate con el administrador",
              icon: "error"
            })
          },
          complete:() => this.spinner.hide()          
        }
      )
    }

}
