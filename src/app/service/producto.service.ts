import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constantes } from '../shared/constanstes';
import { RespuestaGeneral } from '../interface/respuestaGeneral.interface';
import { Producto } from '../interface/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }

  public buscarProductosIdVenta(orden:string,idInventario:number):Observable<RespuestaGeneral> {
      return this.http.get<RespuestaGeneral>(
        `${Constantes.BASE_URL}${Constantes.PRODUCTO}${Constantes.CONSULTAR_PRODUCTOS}`,
        {
          params:{
            "tipoOrdenamiento": orden,
            "idInventario":idInventario
          }
        }
      )
  }

  public crearVentaProducto(codigoProducto:string, idUsuario:any):Observable<boolean> {
    let producto:Producto ={
      codigoProducto:codigoProducto,
      idUsuarioInsercion:idUsuario
    }
    return this.http.post<boolean>(
      `${Constantes.BASE_URL}${Constantes.VENTA}${Constantes.CREAR_VENTA_PRODUCTO}`,producto
    )  
  }

  public crearProducto(producto:Producto){
    return this.http.post<boolean>(
      `${Constantes.BASE_URL}${Constantes.PRODUCTO}${Constantes.CREAR_PRODUCTO}`,producto
    ) 
  }
}
