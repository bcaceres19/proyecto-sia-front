import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MenuComponent } from './menu/menu.component';
import { AdministracionComponent } from './administracion/administracion.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path:'administrador',
    component: MenuComponent,
    children: [
      {
        path: '',
        component: AdministracionComponent
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
