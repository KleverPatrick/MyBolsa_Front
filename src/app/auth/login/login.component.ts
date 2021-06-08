import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuarioAux: Usuario;
  public contraseña: string = ''

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  usuarioControl(addForm: NgForm):any{
    this.usuarioAux = addForm.value;
    this.contraseña = this.usuarioAux.contraseña;
    console.log(this.usuarioAux);
  
    this.usuarioService.findUser(this.contraseña).subscribe(
      (response: any) =>{
        console.log(response);
        if(!response){
          addForm.reset();
          alert("contraseña o usuario incorrecto intentelo de nuevo");
          this.router.navigate(['/login/login'])
        }else if( response.contraseña == this.contraseña){
         
          this.router.navigate(['/productos'])
          
        }           
        
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
       
      }
      
    ) 

  }

  registro(){
    this.router.navigate(['/login/registro'])
  }

}
