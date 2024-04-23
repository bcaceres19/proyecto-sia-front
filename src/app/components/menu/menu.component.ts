import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  abrir:boolean = false;

  formularioCrear:string = '';

  redireccion:string = '';

  idRol:string | null;

  constructor(private route:Router) {
    this.idRol = sessionStorage.getItem("rol")
  }

  cambiarEstado(){
    this.abrir=!this.abrir
  }

  ngOnInit() {
   
  }

    onSalir(){
      sessionStorage.clear()
      this.route.navigate([""]);
    }
}
