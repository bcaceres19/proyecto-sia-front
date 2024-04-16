import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import { AdministracionComponent } from './administracion/administracion.component';
import { VistaTarjetaComponent } from './vista-tarjeta/vista-tarjeta.component'
import {MatCardModule} from '@angular/material/card';
import { CarritoComponent } from './carrito/carrito.component';
import {MatTableModule} from '@angular/material/table';
import { PedidoComponent } from './pedido/pedido.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    MenuComponent,
    AdministracionComponent,
    VistaTarjetaComponent,
    CarritoComponent,
    PedidoComponent
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
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
