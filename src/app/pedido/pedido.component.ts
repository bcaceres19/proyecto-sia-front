import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../service/pedido.service';
import { RespuestaPedido } from '../interface/respuestaPedido.interface';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  pedidosActuales:RespuestaPedido[] = [];

  public nombreColumnas:string[] = ['codigo', 'fecha-vencimiento', 'precio', "estado", "nombre", "stock", "precio-original", "acciones"]



  ngOnInit(): void {
    this.consultarPedidos();
  }

  constructor(private pedidoService:PedidoService){}


  public consultarPedidos(){

    this.pedidoService.servicePedidosPendientes().subscribe(
      {
        next:(v) => {
          if(v.listaData !== undefined){
            this.pedidosActuales = v.listaData as RespuestaPedido[];
            console.log(this.pedidosActuales)
          }
        },
        error:(e) => console.error(e),
        complete:() => console.log("Se completo")          
      }
    )

  }

}
