import { Usuario } from "./usuario.interface";

export interface Venta{

    idVenta:number;

    cantidadVenta:number;

    estadoVenta:string;

    fechaVenta:Date;

    precioTotalVenta:number;

    idUsuarioFk:Usuario;

}