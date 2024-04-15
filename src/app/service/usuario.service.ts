import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constantes } from '../shared/constanstes';
import { UsuarioDto } from '../interface/usuariodto.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  public serviceLogin(dataUsuario:UsuarioDto):Observable<boolean> {

    return this.http.post<boolean>(
      `${Constantes.BASE_URL}${Constantes.USUARIO}${Constantes.LOGIN}`, dataUsuario);
  }

}
