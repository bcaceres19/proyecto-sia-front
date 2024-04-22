import { InventarioRespuesta } from "./inventarioRespuesta.interface";

export interface InventarioInputDto{
    tipoOrdenamiento?:string;
    nombre?:string;
    inventariosRespuesta?:InventarioRespuesta[]
}