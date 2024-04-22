import { Producto } from "./producto.interface";
import { ProductoRespuesta } from "./productoRespuesta.interface";

export interface DataDialogProducts{
    titulo:string;
    nombreColumnas:string[];
    productos:ProductoRespuesta[];
}