import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../service/producto.service';
import { ProductoRespuesta } from '../../interface/productoRespuesta.interface';
import { Producto } from '../../interface/producto.interface';
import { TipoOrden } from '../../shared/tipoOrden.enum';
import { TipoEstadoProducto } from 'src/app/shared/tipoEstadoProducto.enum';
import { DialogoComponent } from '../dialogo/dialogo.component';
import { MatDialog } from '@angular/material/dialog';
import { InventarioService } from 'src/app/service/inventario.service';
import { InventarioRespuesta } from 'src/app/interface/inventarioRespuesta.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit{

  campoBusqueda:FormGroup<any> = new FormGroup(
    {
      nombre:new FormControl('', [])
    }
  )

  get nombre(){
    return this.campoBusqueda.get('nombre') as FormControl;
  }

  public inventario:InventarioRespuesta[] = [];

  public productos:ProductoRespuesta[] = [];

  public textoOrdFiltro:string = "Ordenamiento";

  public isLoading:boolean = false;

  public orden:string = "";
  ngOnInit(): void {
    this.consultarData(TipoOrden.POST_ORDEN);
  }

  constructor(private productoService:ProductoService, private matDialog:MatDialog,
    private inventarioService:InventarioService, private router:Router,
  private spinner:NgxSpinnerService  ){}
 
  public registrarProductoVenta(codigoProducto:string){
    let idUsuario:string | null = sessionStorage.getItem("id"); 
    this.spinner.show()
    this.productoService.crearVentaProducto(codigoProducto, idUsuario).subscribe({
      next:(v) => {},
      error:(e) =>{
        this.spinner.hide()
        console.error(e)
        },
      complete:() =>{
        this.spinner.hide()
        console.log("Se completo")}       
    })
  }

  public consultarData(orden:string){
    let inventarios:InventarioRespuesta[];
    let texto = this.nombre.value.trim()
    if(this.orden !== TipoOrden.INORDEN && texto !== ""){
      inventarios = this.inventario;
    }else if(texto !== ""){
      inventarios = this.inventario;
    }else{
      inventarios = [];
    }
    this.orden = orden;
    this.spinner.show()
    this.inventarioService.consultaInventario(orden,inventarios).subscribe(
      {
        next:(v) => {
          if(v.listaData !== undefined && v.listaData.length){
              this.inventario = v.listaData as InventarioRespuesta[];
          }
        },
        error:(e) => {
          this.spinner.hide()
          console.error(e)
        },
        complete:() => {
          this.spinner.hide()
        
          this.textoOrdFiltro = this.escogerNombreTipoOrden(orden)
        }      
      }
    )
  }

  public consultarDataNombre(){
    let texto:string = this.nombre.value.trim();
    if(texto.trim()!== ""){
      this.spinner.show()
      this.inventarioService.consultarInventarioNombre(this.orden, this.nombre.value).subscribe(
        {
          next:(v) => {
            if(v.listaData !== undefined && v.listaData.length){
              this.inventario = v.listaData as InventarioRespuesta[];
            }
          },
          error:(e) => {
            this.spinner.hide()
            console.error(e)
          },
          complete:() => {
            this.spinner.hide()
          }
        }
      )
    }else{
      this.consultarData(this.orden);
    }
  }

  private escogerNombreTipoOrden(tipoOrden:string | undefined):string{    
    if(tipoOrden == undefined){
      return "Ordenamiento";
    }
    const nombres: Record<string, string> = {
      [TipoOrden.INORDEN]: "Inorden",
      [TipoOrden.PRE_ORDEN]: "PreOrden",
      [TipoOrden.POST_ORDEN]: "PostOrden"
    }
    
    return nombres[tipoOrden] || "Ordenamiento";
  }

  public irCarrito(){
    this.router.navigate(["administrador/carrito"])
  }

  public abrirModal(idInventario:number){
    this.spinner.show()
    this.productoService.buscarProductosIdVenta(TipoOrden.PRE_ORDEN, idInventario).subscribe(
      {
        next:(v) => {
          if(v.listaData !== undefined && v.listaData.length){
            this.productos = v.listaData as ProductoRespuesta[];
          }
        },
        error:(e) => console.error(e),
        complete:() => {
          const dialogoRef = this.matDialog.open(DialogoComponent, {
            data:{
              nombreColumnas: [
              "codigoProducto",
              "fechaVencimiento",
              "tipoProducto",
              "estadoProducto",
              "precio",
              "acciones"
              ],
              productos: this.productos,
              titulo:"Otros Precios"
            }
          })
          dialogoRef.afterClosed().subscribe(res => {
            for(const codigo of res){
              this.registrarProductoVenta(codigo);
            }
          });
          this.spinner.hide()
        }
      }
    )
    
  }

}
