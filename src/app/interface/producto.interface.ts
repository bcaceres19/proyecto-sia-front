import { Inventario } from "./inventario.interface";

export interface Producto {

    codigoProducto?:string;

    precioProducto?:number;

    fechaVencimientoProducto?:string;

    estadoProducto?:string;

    posicionInsercion?:number;

    idInventarioFk?:Inventario;

    idUsuarioInsercion?:number;

}