import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {
  formCrearUsuario = new FormGroup({
    'nombres': new FormControl('', []),
    'apellidos': new FormControl('', []),
    'telefono': new FormControl('',[]),
    'email': new FormControl('',[]),
    'contraseina': new FormControl('',[]),
    'repetirContraseina': new FormControl('', []),
    'rol': new FormControl('',[])
  })

  get nombres(){
    return this.formCrearUsuario.get('nombres') as FormControl;
  }

  get apellidos(){
    return this.formCrearUsuario.get('apellidos') as FormControl;
  }

  get telefono(){
    return this.formCrearUsuario.get('telefono') as FormControl;
  }

  get email(){
    return this.formCrearUsuario.get('email') as FormControl;
  }

  get contraseina(){
    return this.formCrearUsuario.get('contraseina') as FormControl;
  }

  get rol(){
    return this.formCrearUsuario.get('rol') as FormControl;
  }

  get repetirContraseina(){
    return this.formCrearUsuario.get('repetirContraseina') as FormControl;
  }

  

}
