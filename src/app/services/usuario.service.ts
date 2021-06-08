import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Usuario } from "../models/usuario";

@Injectable({
    providedIn: 'root'
  })

export class UsuarioService{
    private apiServerUrl = environment.apiBaseUrl
    constructor(private http: HttpClient){

    }

    public addUsuario(usuario:Usuario):Observable<Usuario>{
        return this.http.post<Usuario>(`${this.apiServerUrl}/login/add`, usuario);
    }

    public findUser(password: string): Observable<void>{
        console.log(password);
        return this.http.get<void>(`${this.apiServerUrl}/login/usuario/${password}`);

    }
}