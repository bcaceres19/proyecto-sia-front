import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { elementAt, merge } from 'rxjs';
import { Rol } from 'src/app/interface/rol.interface';
import { Usuario } from 'src/app/interface/usuario.interface';
import { ListasService } from 'src/app/service/listas.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent {
  public errorEmail: string = '';

  public errorTelefono: string = '';

  public errorNombre: string = '';

  public errorApellido: string = '';

  public errorPassword: string = '';

  public errorRol: string = '';

  public repeatErrorPassword: string = '';

  public idRol: string | null;

  public roles: Rol[] = [];

  public contraseinDesiguales: boolean = false;

  formCrearUsuario: FormGroup<any> = new FormGroup<any>({
    nombres: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contraseina: new FormControl('', [Validators.required]),
    repetirContraseina: new FormControl('', [Validators.required]),
    rol: new FormControl('', []),
  });

  constructor(
    private service: ListasService,
    private serviceUsuario: UsuarioService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.idRol = sessionStorage.getItem('rol');
    if (this.idRol === null) {
      this.rol.setValue(2);
    } else {
      this.rol.addValidators(Validators.required);
    }

    this.consultarListas();
  }

  get nombres() {
    return this.formCrearUsuario.get('nombres') as FormControl;
  }

  get apellidos() {
    return this.formCrearUsuario.get('apellidos') as FormControl;
  }

  get telefono() {
    return this.formCrearUsuario.get('telefono') as FormControl;
  }

  get email() {
    return this.formCrearUsuario.get('email') as FormControl;
  }

  get contraseina() {
    return this.formCrearUsuario.get('contraseina') as FormControl;
  }

  get rol() {
    return this.formCrearUsuario.get('rol') as FormControl;
  }

  get repetirContraseina() {
    return this.formCrearUsuario.get('repetirContraseina') as FormControl;
  }

  consultarListas() {
    this.spinner.show();
    this.service.consultarTiposRoles().subscribe({
      next: (v) => {
        if (v.listaData !== undefined && v.listaData.length) {
          this.roles = v.listaData as Rol[];
          if(this.idRol !==  "1"){
            this.roles = this.roles.filter(elemento => elemento.idRol  !== 1)
          }
        }
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  crearUsuario() {
    let usuarioDto: Usuario = {
      nombres: this.nombres.value,
      apellidos: this.apellidos.value,
      contraseina: this.contraseina.value,
      email: this.email.value,
      telefono: this.telefono.value,
      idRolFk: {
        idRol: this.rol.value,
      },
    };
    this.spinner.show();
    // Verificar si las contraseñas coinciden
    if (this.contraseina.value !== this.repetirContraseina.value) {
      this.contraseinDesiguales = true;
      this.spinner.hide()
      Swal.fire({
        text:'Las contraseñas deben coincidir',
        icon: "error"
      })
    } else {
      this.serviceUsuario.crearUsuario(usuarioDto).subscribe({
        next: (v) => {},
        error: (e) => {
          this.spinner.hide();
          console.log(e);
        },
        complete: () => {
          this.spinner.hide();
          if (this.idRol !== null) {
            this.router.navigate(['administrador/']);
          } else {
            this.router.navigate(['']);
          }
        },
      });
    }
  }

  filtrarNumeros(event: KeyboardEvent) {
    // Obtener el código de la tecla presionada
    const codigoTecla = event.keyCode || event.which;

    // Permitir teclas de control como 'Backspace', 'Tab', etc.
    if (codigoTecla === 8 || (codigoTecla > 47 && codigoTecla < 58)) {
      return; // Permitir números
    } else {
      event.preventDefault(); // Prevenir la entrada de otros caracteres
    }
  }

  actualizarErrorMessage() {
    // Verificar errores de campos
    if (this.email.invalid) {
      if (this.email.hasError('required')) {
        this.errorEmail = 'Se requiere un email';
      } else if (this.email.hasError('email')) {
        this.errorEmail = 'Se requiere un email válido';
      }
    }

    if (this.nombres.hasError('required')) {
      this.errorNombre = 'Se requiere el nombre';
    }

    if (this.apellidos.hasError('required')) {
      this.errorApellido = 'Se requieren los apellidos';
    }

    if (this.telefono.hasError('required')) {
      this.errorTelefono = 'Se requiere un teléfono';
    }

    if (this.contraseina.hasError('required')) {
      this.errorPassword = 'Se requiere una contraseña';
    }

    if (this.repetirContraseina.hasError('required')) {
      this.repeatErrorPassword = 'Se requiere repetir la contraseña';
    }

    if (this.rol.hasError('required')) {
      this.errorRol = 'Se requiere un rol';
    }
  }

  volver(){
    if (this.idRol !== null) {
      this.router.navigate(['administrador/']);
    } else {
      this.router.navigate(['']);
    }
  }
}
