import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';

//Creamos unas constante routes donde se va a guardar las rutas
const routes: Routes  = [
  {
    //le decimos que el nombre que queremos cargar es en mi caso login¡, pero no tiene ninguna relacion con el módulo
    path:'login', 
    //cuando se entra en la funcion empieza a cargar una funcion 'loadChildre' 
    loadChildren: () => import('./auth/auth.module') //cragamos el módulo xq ahi es donde estan todo declarado, componentes ...
    //nos retorna una promesa
    .then(
      m => (m.AuthModule)
    )

    
  },
  {
    path:'productos',
    component: ProductosComponent
  },
  {
    path:'**',
    redirectTo:'login'
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]

})
export class AppRoutingModule { }
