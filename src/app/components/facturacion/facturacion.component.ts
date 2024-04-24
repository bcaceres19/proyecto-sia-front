import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Facturacion } from '../../interface/facturacion.interface';
import { PedidoService } from '../../service/pedido.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit{

  idUsuario!:number;


  public nombreColumnas:string[] = ['codigoPedido', 
  'cantidadElementos', 
  'total', 
  'fechaVenta', 
  'fechaInicioPedido', 
  'acciones']

  dataSource = new MatTableDataSource<Facturacion>();

  dataSourceElim = new MatTableDataSource<Facturacion>();

  @ViewChild('paginadorAceptadas') paginadorAceptadas:MatPaginator | undefined;
  @ViewChild('paginadorEliminadas') paginadorEliminadas:MatPaginator | undefined;

  ngOnInit(): void {
    this.idUsuario = Number.parseInt(sessionStorage.getItem("id")!.toString())
    this.consultarPedidos("aceptada");
    this.consultarPedidos("eliminada");
  }

  constructor(private pedido:PedidoService, private spinner:NgxSpinnerService){}

  public consultarPedidos(tipo:string){
    this.spinner.show()
    this.pedido.servicePedidosFacturacion(this.idUsuario, tipo).subscribe(
      {
        next:(v)=>{
          if(v.listaData !== undefined){
            if(tipo === "aceptada"){
              this.dataSource = new MatTableDataSource<Facturacion>(v.listaData as Facturacion[]);
              this.dataSource.paginator = this.paginadorAceptadas!;
            }else{
              this.dataSourceElim = new MatTableDataSource<Facturacion>(v.listaData as Facturacion[]);
              this.dataSourceElim.paginator = this.paginadorEliminadas!;
            }
          }
        },
        error:(e) => {
          console.error(e)
          this.spinner.hide()
        },
        complete:() =>  this.spinner.hide()
      }
    )
  }

  public cambiarEstado(codigoPedido:string, estado:string){
    this.spinner.show();
    this.pedido.cambiarEstado(codigoPedido,estado).subscribe(
      {
        next:(v)=>{},
        error:(e) => {
          console.error(e)
          this.spinner.hide()
        },
        complete:() =>{
          this.consultarPedidos("aceptada")
          this.consultarPedidos("eliminada")
        }
      }
    )  }

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
