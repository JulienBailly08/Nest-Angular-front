import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Mise en place du lazy loading pour le module
const routes: Routes = [
  { path: 'articles', loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
