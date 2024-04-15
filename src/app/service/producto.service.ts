import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constantes } from '../shared/constanstes';
import { RespuestaGeneral } from '../interface/respuestaGeneral.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }

  public productosActuales():Observable<RespuestaGeneral> {

      return this.http.get<RespuestaGeneral>(
        `${Constantes.BASE_URL}${Constantes.PRODUCTO}${Constantes.CONSULTAR}`
      )

  }

}
