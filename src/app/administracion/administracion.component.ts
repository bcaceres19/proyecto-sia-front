import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../service/producto.service';
import { ProductoInterface } from '../interface/productoRespuesta.interface';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit{

  public productos:ProductoInterface[] = [];

  ngOnInit(): void {
    this.consultarProductos();
    console.log(this.productos)
  }

  constructor(private productoService:ProductoService){}
 
  public consultarProductos(){
    this.productoService.productosActuales().subscribe(
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
