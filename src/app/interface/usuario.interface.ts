import { Rol } from "./rol.interface";

export interface Usuario{

    idUsuario?:number;

    nombres?:string;

    apellido?:string;

    telefono?:string;

    email?:string;

    contraseina?:string;

    idRolFk?:Rol;

}