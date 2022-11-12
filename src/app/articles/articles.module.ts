import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleSummaryComponent } from './article-summary/article-summary.component';
import { AdminModule } from '../admin/admin.module';


@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleSummaryComponent,
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    AdminModule
  ]
})
export class ArticlesModule { }
