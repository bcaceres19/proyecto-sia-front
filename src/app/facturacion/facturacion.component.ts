import { Component, OnInit } from '@angular/core';
import { Facturacion } from '../interface/facturacion.interface';
import { PedidoService } from '../service/pedido.service';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit{

  idUsuario!:number;

  public pedidosFacturacion:Facturacion[] = [];

  public nombreColumnas:string[] = ['codigoPedido', 
  'cantidadElementos', 
  'total', 
  'fechaVenta', 
  'fechaInicioPedido', 
  'acciones']

  ngOnInit(): void {
    this.idUsuario = Number.parseInt(sessionStorage.getItem("id")!.toString())
    this.consultarPedidos();
  }

  constructor(private pedido:PedidoService){}

  public consultarPedidos(){
    this.pedido.servicePedidosFacturacion(this.idUsuario).subscribe(
      {
        next:(v)=>{
          if(v.listaData !== undefined){
            this.pedidosFacturacion = v.listaData as Facturacion[]
          }
        },
        error:(e) => console.error(e),
        complete:() => console.log("Se completo")
      }
    )
  }

  public descargar(codigoPedido:string) {
    let base64 = ""
    this.pedido.serviceReportePedido(codigoPedido).subscribe({
      next: (v) => {
        base64 = v.data as string;
      },
      error: (e) => console.error(e),
      complete: () => {
        console.error(base64);
        
        const byteArray = new Uint8Array(
          atob(base64)
            .split('')
            .map((char) => char.charCodeAt(0))
        );
        const file = new Blob([byteArray], {type:'application/pdf'});
        const fileUrl = URL.createObjectURL(file);
        let fileName = 'descarga';
        let link = document.createElement('a');
        link.download = fileName;
        link.target = '_blank'
        link.href = fileUrl
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  }

}
