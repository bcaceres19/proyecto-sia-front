import { Component, OnInit } from '@angular/core';
import { VentaProductoRespuesta } from '../interface/ventaProductoRespuesta.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from '../interface/producto.interface';
import { VentaService } from '../service/venta.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

    public productosVenta!:VentaProductoRespuesta;


    public dataSource!:MatTableDataSource<Producto>;

    public nombreColumnas:string[] = ['codigo', 'precio', 'estado', "acciones"]

    ngOnInit(): void {
      this.consultarProductosVenta();
    }

    constructor(private inventarioService:VentaService){
    }

    public consultarProductosVenta(){

      this.inventarioService.serviceVentaUsuario(1).subscribe(
        {
          next:(v) => {
            if(v.data !== undefined && v.data !== null){
              this.productosVenta = v.data as VentaProductoRespuesta;
              this.dataSource = new MatTableDataSource<Producto>(this.productosVenta.productos);
            }
          },
          error:(e) => console.error(e),
          complete:() => console.log("Se completo")          
        }
      )

    }

}
