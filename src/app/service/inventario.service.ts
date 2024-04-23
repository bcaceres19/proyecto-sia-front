import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventarioRespuesta } from '../interface/inventarioRespuesta.interface';
import { Constantes } from '../shared/constanstes';
import { RespuestaGeneral } from '../interface/respuestaGeneral.interface';
import { InventarioInputDto } from '../interface/inventarioInputDto.interface';
import { Inventario } from '../interface/inventario.interface';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http:HttpClient) { }

  public consultaInventario(orden:string, dataActual:InventarioRespuesta[]):Observable<RespuestaGeneral>{
    let input:InventarioInputDto = {
      tipoOrdenamiento:orden,
      inventariosRespuesta:dataActual
    }
    return this.http.post<RespuestaGeneral>(
      `${Constantes.BASE_URL}${Constantes.INVENTARIO}${Constantes.CONSULTAR_INVENTARIO}`,
      input
    )
  }

  public consultarInventarioNombre(orden:string,nombre:string): Observable<RespuestaGeneral>{
    let input:InventarioInputDto = {
        nombre: nombre,
        tipoOrdenamiento: orden
    }
    return this.http.post<RespuestaGeneral>(
      `${Constantes.BASE_URL}${Constantes.INVENTARIO}${Constantes.CONSULTAR_INVENTARIO_NOMBRE}`,
      input
    )
  }

  public crearInventario(inventario:Inventario){
    return this.http.post<RespuestaGeneral>(
      `${Constantes.BASE_URL}${Constantes.INVENTARIO}${Constantes.CREAR_INVENTARIO}`,
      inventario
    )
  }
}
