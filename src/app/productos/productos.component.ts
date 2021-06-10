import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscriber } from 'rxjs';
import { Producto } from '../models/producto';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  title = 'myBolsaApp';
  public productos: Producto[];
  public editProducto: Producto;
  public deleteProducto: Producto;

  public imagenCapturada: File;
  public prodAux: Producto;
  imageString?: string;
  Base64Imagen: string = '';

  constructor(private sanitizer: DomSanitizer, private productoService:ProductoService ){

  }

  ngOnInit() {
    this.getProductos();
  }
  public getProductos():void{
    this.productoService.getProductos().subscribe(
      
      (response: Producto[]) => {
        this.productos = response;
      
      },
      (error: HttpErrorResponse)=>{
        alert(error.message)
      }
    );
  }

  //Funccion para capturar una imagen
  capturarFile(event):any{
    this.imagenCapturada = <File>event.target.files[0];
      this.convertToBase64(this.imagenCapturada);
    
  }

  
  convertToBase64(file:File){
    const observable = new Observable((subscriber: Subscriber<any> )=>{
      this.readFile(this.imagenCapturada, subscriber);
    })
    observable.subscribe((d) =>{
      this.imageString = d;
     
    });
  }

  readFile(file: File, subscriber: Subscriber<any>){
    const filereader = new FileReader();
    filereader.readAsDataURL(file);

    filereader.onload = ()=>{
      subscriber.next(filereader.result)
      subscriber.complete()
    }
    filereader.onerror = (error)=>{
      subscriber.error(error);
      subscriber.complete()
    }
  }
    
  
  


  public onAddProduct(addForm: NgForm): void{ 
    this.prodAux = addForm.value;
    this.prodAux.imageUrl = this.imageString;
    this.productoService.addProducto(this.prodAux ).subscribe(
      (response: Producto) => {
        this.getProductos();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    )   
  
  }

  
  public onUpdateProduct(producto: Producto): void{
    console.log(producto);
    this.productoService.updateProducto(producto).subscribe(

      (response: Producto) => {
        console.log(response);
        this.getProductos();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    )
  
  }

  public onDeleteProduct(id: number){
    this.productoService.deleteProducto(id).subscribe(
      (response: void)=>{
        console.log(response);
        this.getProductos();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  //funcion para buscar un empleado
  public searchProduct(key: string):void{
    console.log(key);
    const results: Producto[] = [];
    for(const producto of this.productos){
      //En este caso con el metodo indexOf si no devuelve el valor -1 quiere decir que 
      //al comparar el primero String que hace la llamada con el la palabra clave q se la pasa son iguales
      if (producto.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || producto.description.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || producto.precio.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(producto);
      }
    }

    this.productos = results;
    if(results.length === 0 || !key){
      this.getProductos();
    }
  }






  public onOpenModal(producto:Producto, mode: string ):void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add'){
      button.setAttribute('data-target', '#addProductoModal');
    }
  
    if(mode === 'edit'){
      this.editProducto = producto;
      button.setAttribute('data-target', '#updateProductoModal');
    }

    if(mode === 'delete'){
      this.deleteProducto = producto;
      button.setAttribute('data-target', '#deleteProductoModal');
    }

    container.appendChild(button);
    button.click();
  }

}
