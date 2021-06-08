import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private  apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getProductos():Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/producto/all`);
  }
  public addProducto(producto: Producto):Observable<Producto>{
    return this.http.post<Producto>(`${this.apiServerUrl}/producto/add`, producto );
  }

  public updateProducto(producto:Producto):Observable<Producto>{
    return this.http.put<Producto>(`${this.apiServerUrl}/producto/update`, producto);
  }

  public deleteProducto(productoId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/producto/delete/${productoId}`);
  }

}
