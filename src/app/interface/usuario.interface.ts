import { Rol } from "./rol.interface";

export interface Usuario{

    idUsuario?:number;

    nombres?:string;

    apellidos?:string;

    telefono?:string;

    email?:string;

    contraseina?:string;

    idRolFk?:Rol;

}