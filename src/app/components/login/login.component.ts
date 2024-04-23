import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../interface/usuario.interface';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public errorMessage:string = 'No se ingreso un email valido';


  formLogin = new FormGroup({
    'email': new FormControl('', [Validators.required,Validators.email]),
    'contraseina': new FormControl('', [Validators.required])
  })

  get email(){
    return this.formLogin.get('email') as FormControl
  }

  get contraseina(){
    return this.formLogin.get('contraseina') as FormControl
  }
  
  constructor(private usuarioService:UsuarioService,private router:Router,
    private spinner:NgxSpinnerService
  ){

  }

  public loginUsuario(){
    if(this.email.invalid){
      this.generarAlerta()
    }else{
      let dataUsuario: Usuario = {
        email: this.email.value,
        contraseina: this.contraseina.value
      }
      this.spinner.show();
      this.usuarioService.serviceLogin(dataUsuario).subscribe(
        {
          next:(v) => {
            if(v.status){
              let usuario:Usuario = v.data as Usuario;
              sessionStorage.setItem("id",  usuario.idUsuario!.toString());
              sessionStorage.setItem("rol", usuario.idRolFk!.idRol!.toString()) 
              this.router.navigate(["administrador"])
            }else{
              this.generarAlerta()
            }
          },
          error:(e) => {
            this.spinner.hide()
            console.error(e)
          },
          complete:() => this.spinner.hide()          
        }
      )
    }
  }

  private generarAlerta(){
    Swal.fire({
      text:"La contraseña o email son incorrectos, ingresalos nuevamente",
      icon: "error"
    })
  }

}
