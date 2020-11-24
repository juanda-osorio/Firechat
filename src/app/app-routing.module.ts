import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  //{ path: 'home', component: HomeComponent }, //Esta es la sintaxis de la utilización de un componente.
  {path: '', pathMatch: 'full', redirectTo: ''},
  {path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
