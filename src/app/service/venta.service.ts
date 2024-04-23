import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaGeneral } from '../interface/respuestaGeneral.interface';
import { Constantes } from '../shared/constanstes';
import { Observable, Subject, tap } from 'rxjs';
import { Venta } from '../interface/venta.interface';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private _refresh$ = new Subject<void>();
  get refresh$(){
    return this._refresh$;
  }
  constructor(private http:HttpClient) { }

  public serviceVentaUsuario(idUsuarioP:number):Observable<RespuestaGeneral>{

    return this.http.get<RespuestaGeneral>(
      `${Constantes.BASE_URL}${Constantes.VENTA}${Constantes.CONSULTAR_SIN_CONFIRMAR}`,{
        params:{
          idUsuario: idUsuarioP
        }
      }
    )
  }

  public serviceRealizarVentaConfirmada(venta:Venta):Observable<boolean>{
    return this.http.post<boolean>(
      `${Constantes.BASE_URL}${Constantes.VENTA}${Constantes.CREAR_VENTA_CON_PEDIDO}`,venta
    )
  }

  public serviceEliminarProductoUsuario(idVentaProducto:number):Observable<boolean>{
    return this.http.post<boolean>(
      `${Constantes.BASE_URL}${Constantes.VENTA}${Constantes.ELIMINAR_PRODUCTO_VENTA}`,
      {},
      {
        params:{
          idVentaProducto:idVentaProducto
        }
      }
      
    ).pipe(
      tap(() => {
        this._refresh$.next()
      })
    )
  }
  

}
