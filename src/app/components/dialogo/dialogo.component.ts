import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataDialogProducts } from 'src/app/interface/dataDialogProducts.interface';
import { Producto } from 'src/app/interface/producto.interface';
import { ProductoRespuesta } from 'src/app/interface/productoRespuesta.interface';
import { InventarioService } from 'src/app/service/inventario.service';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent {

  constructor(
    public dialogRef:MatDialogRef<DialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DataDialogProducts,
    private productoService:ProductoService, private spinner:NgxSpinnerService
  ){}

  public onClickNo(): void{
    this.dialogRef.close();
  }

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

}
