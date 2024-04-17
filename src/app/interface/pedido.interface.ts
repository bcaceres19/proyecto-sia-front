import { Usuario } from "./usuario.interface";
import { Venta } from "./venta.interface";

export interface Pedido {
    
    codigoPedido?:string;

    fechaInicioPedido?:Date;

    fechaVencimientoPedido?:Date,

    idUsuarioFk?:Usuario;

    idVentaFk?:Venta;

}