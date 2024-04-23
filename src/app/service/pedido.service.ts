import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaGeneral } from '../interface/respuestaGeneral.interface';
import { Constantes } from '../shared/constanstes';
import { Observable, Subject, tap } from 'rxjs';
import { Pedido } from '../interface/pedido.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private _refresh$ = new Subject<void>();
  get refresh$(){
    return this._refresh$;
  }
  constructor(private http:HttpClient) { }

  public servicePedidosPendientes():Observable<RespuestaGeneral>{
    return this.http.get<RespuestaGeneral>(
      `${Constantes.BASE_URL}${Constantes.PEDIDO}${Constantes.CONSULTAR_PEDIDOS_PENDIENTES}`
    )
  }

  public servicePedidosFacturacion(idUsuario:number):Observable<RespuestaGeneral>{
    return this.http.get<RespuestaGeneral>(
      `${Constantes.BASE_URL}${Constantes.PEDIDO}${Constantes.CONSULTAR_PEDIDOS_FACTURACION}`,
      {
        params: {
          "idUsuario": idUsuario
        }
      }
    )
  }

  public serviceAcpetarPedido(pedidoIn:Pedido):Observable<RespuestaGeneral>{
    return this.http.post<RespuestaGeneral>(
      `${Constantes.BASE_URL}${Constantes.PEDIDO}${Constantes.ACEPTAR_PEDIDO}`,
        pedidoIn
    ).pipe(
      tap(() => {
        this._refresh$.next()
      })
    )
  }

  public serviceRechazarPedido(pedidoIn:Pedido):Observable<RespuestaGeneral>{
    return this.http.post<RespuestaGeneral>(
      `${Constantes.BASE_URL}${Constantes.PEDIDO}${Constantes.RECHAZAR_PEDIDO}`,
        pedidoIn
    ).pipe(
      tap(() => {
        this._refresh$.next()
      })
    )
  }

  public serviceReportePedido(codigoPedio:string):Observable<RespuestaGeneral>{
    return this.http.get<RespuestaGeneral>(
      `${Constantes.BASE_URL}${Constantes.PEDIDO}${Constantes.GENERAR_REPORTE}`,
      {
        params: {
          "codigoPedido": codigoPedio
        }
      }
    )
  }

}
