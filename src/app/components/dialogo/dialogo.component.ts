import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataDialogProducts } from 'src/app/interface/dataDialogProducts.interface';
import { Producto } from 'src/app/interface/producto.interface';
import { ProductoRespuesta } from 'src/app/interface/productoRespuesta.interface';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent {

  public codigoProductos:string[] = [];

  constructor(
    public dialogRef:MatDialogRef<DialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DataDialogProducts
  ){}

  public onClickNo(): void{
    this.dialogRef.close();
  }

  public addCodigoProductos(codigo:string){
    this.codigoProductos.push(codigo);
  }

}
