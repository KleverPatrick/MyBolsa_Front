import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  //metodos necesarios
  public usuarioAux:Usuario;
  
  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
   
  }
  

  registroUsuario(addForm: NgForm){
    let passConfir = (<HTMLInputElement>document.getElementById('conf_pass')).value;
    console.log(passConfir)
    this.usuarioAux = addForm.value;
    console.log(this.usuarioAux);
    let pass = this.usuarioAux.contraseña;
    console.log(pass)
    if(pass !== passConfir){
      alert('Las contraseñas no coinciden')
    }else{
      console.log('contraseñas iguales')
      console.log(this.usuarioAux )
      this.usuarioService.addUsuario(this.usuarioAux).subscribe(
        (response: Usuario) => {
          console.log(response)
          addForm.reset();
    
        },
        (error: HttpErrorResponse)=>{
          alert(error.message)
        }
      )
      this.router.navigate(['/auth/login']); 

    }
    
  }



}
