import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';


const routes:Routes = [
  {
    //este path me lo define el routing module del padre
    path:'',

    children:[
      {
        path:'login', component: LoginComponent
      },
      {
        path:'registro', component: RegistroComponent
      },
      {
        //Con esto, cada vez que entramos el modulo este redireccionamos al login
        path:'**', redirectTo: 'login'
      }
    ]
  }
]



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule { }
