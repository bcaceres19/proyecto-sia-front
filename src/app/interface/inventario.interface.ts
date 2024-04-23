import { TipoProducto } from "./tipoProducto.interface";

export interface Inventario{
    idInventario?:number;

    precioProductoInventario?:number;

    stockProductoInventario?:number;

    nombreProductoInventario?:string;

    idTipoProductoFk?:TipoProducto;

    urlImagenProducto?:string;

    porcentajeAumentoPrecio?:number;

    fechaVencimiento?:Date;
}