import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaGeneral } from '../interface/respuestaGeneral.interface';
import { Constantes } from '../shared/constanstes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http:HttpClient) { }

  public servicePedidosPendientes():Observable<RespuestaGeneral>{
    return this.http.get<RespuestaGeneral>(
      `${Constantes.BASE_URL}${Constantes.PEDIDO}${Constantes.CONSULTAR_PEDIDOS_PENDIENTES}`
    )
  }

}
