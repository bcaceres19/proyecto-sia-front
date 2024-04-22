import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { VistaTarjetaComponent } from './components/vista-tarjeta/vista-tarjeta.component'
import {MatCardModule} from '@angular/material/card';
import { CarritoComponent } from './components/carrito/carrito.component';
import {MatTableModule} from '@angular/material/table';
import { PedidoComponent } from './components/pedido/pedido.component';
import { FacturacionComponent } from './components/facturacion/facturacion.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogoComponent } from './components/dialogo/dialogo.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { CrearProductoInventarioComponent } from './components/crear-producto-inventario/crear-producto-inventario.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    MenuComponent,
    AdministracionComponent,
    VistaTarjetaComponent,
    CarritoComponent,
    PedidoComponent,
    FacturacionComponent,
    DialogoComponent,
    CrearUsuarioComponent,
    CrearProductoInventarioComponent,
    CrearProductoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSidenavModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    ScrollingModule,
    MatOptionModule,
    MatSelectModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
