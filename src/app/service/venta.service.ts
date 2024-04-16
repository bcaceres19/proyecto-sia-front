import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaGeneral } from '../interface/respuestaGeneral.interface';
import { Constantes } from '../shared/constanstes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

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
}
