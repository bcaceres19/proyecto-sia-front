import { ProductoInventario } from "./productoInventario.interface";

export interface RespuestaPedido{
    codigoPedido:string;
    fechaInicioPedido:Date;
    fechaVencimientoPedido:Date;
    cantidadProductosVenta:number;
    valorTotal:number;
    productos:ProductoInventario[];
}