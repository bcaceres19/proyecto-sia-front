import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaGeneral } from '../interface/respuestaGeneral.interface';
import { Constantes } from '../shared/constanstes';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  constructor(private http:HttpClient) { }

  public consultarTiposRoles():Observable<RespuestaGeneral>{
    return this.http.get<RespuestaGeneral>(
      `${Constantes.BASE_URL}${Constantes.LISTAS}${Constantes.CONSULTAR_ROLES_USUARIO}`
    )
  }

  public consultarTiposProductos():Observable<RespuestaGeneral>{
    return this.http.get<RespuestaGeneral>(
      `${Constantes.BASE_URL}${Constantes.LISTAS}${Constantes.CONSULTAR_TIPOS_PRODUCTOS}`
    )
  }
}
