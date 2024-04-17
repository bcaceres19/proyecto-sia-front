import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../service/pedido.service';
import { RespuestaPedido } from '../interface/respuestaPedido.interface';
import { Pedido } from '../interface/pedido.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
})
export class PedidoComponent implements OnInit {
  pedidosActuales: RespuestaPedido[] = [];

  public nombreColumnas: string[] = [
    'codigo',
    'fecha-vencimiento',
    'precio',
    'estado',
    'nombre',
    'stock',
    'precio-original',
  ];
  suscripcion:Subscription = new Subscription()

  ngOnInit(): void {
    this.consultarPedidos();
    this.suscripcion = this.pedidoService.refresh$.subscribe(() => {        
      this.consultarPedidos()
    })
  }

  constructor(private pedidoService: PedidoService) {}

  public consultarPedidos() {
    this.pedidoService.servicePedidosPendientes().subscribe({
      next: (v) => {
        if (v.listaData !== undefined) {
          this.pedidosActuales = v.listaData as RespuestaPedido[];
        }
      },
      error: (e) => console.error(e),
      complete: () => console.log('Se completo'),
    });
  }

  public aceptarPedido(codigoPedido:string){
    let pedido:Pedido = {
      codigoPedido:codigoPedido
    }
    this.pedidoService.serviceAcpetarPedido(pedido).subscribe({
      next: (v) => {
        if (v.listaData !== undefined) {
          this.pedidosActuales = v.listaData as RespuestaPedido[];
        }
      },
      error: (e) => console.error(e),
      complete: () => console.log('Se completo'),
    });
  }

  public rechazarPedido(codigoPedido:string){
    let pedido:Pedido = {
      codigoPedido:codigoPedido
    }
    this.pedidoService.serviceRechazarPedido(pedido).subscribe({
      next: (v) => {
        if (v.listaData !== undefined) {
          this.pedidosActuales = v.listaData as RespuestaPedido[];
        }
      },
      error: (e) => console.error(e),
      complete: () => console.log('Se completo'),
    });
  }

}
