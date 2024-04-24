import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MenuComponent } from './components/menu/menu.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { FacturacionComponent } from './components/facturacion/facturacion.component';
import { permisosGuard } from './permisos.guard';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { CrearProductoInventarioComponent } from './components/crear-producto-inventario/crear-producto-inventario.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: CrearUsuarioComponent
  },
  {
    path:'administrador',
    component: MenuComponent,
   canActivate: [permisosGuard],
    children: [
      {
        path: '',
        component: AdministracionComponent
      },
      {
        path: 'registro-usuario',
        component: CrearUsuarioComponent
      },
      {
        path: 'registro-inventario',
        component: CrearProductoInventarioComponent
      },
      {
        path: 'carrito',
        component: CarritoComponent
      },
      {
        path: 'pedido',
        component: PedidoComponent
      },
      {
        path: 'registro-producto',
        component: CrearProductoComponent
      },
      {
        path: 'facturacion',
        component: FacturacionComponent
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
