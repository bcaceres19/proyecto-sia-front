import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constantes } from '../shared/constanstes';
import { Usuario } from '../interface/usuario.interface';
import { RespuestaGeneral } from '../interface/respuestaGeneral.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  public serviceLogin(dataUsuario:Usuario):Observable<RespuestaGeneral> {

    return this.http.post<RespuestaGeneral>(
      `${Constantes.BASE_URL}${Constantes.USUARIO}${Constantes.LOGIN}`, dataUsuario);
  }

  public crearUsuario(dataUsuario:Usuario): Observable<RespuestaGeneral>{
    return this.http.post<RespuestaGeneral>(
      `${Constantes.BASE_URL}${Constantes.USUARIO}${Constantes.CREAR_USUARIO}`, dataUsuario
    )
  }

}
