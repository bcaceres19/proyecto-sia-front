import { Producto } from "./producto.interface";
import { Venta } from "./venta.interface";

export interface VentaProductoRespuesta{

    venta:Venta;

    productos:Producto[];

}