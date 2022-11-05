import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) { }
  
  createArticle(article:Article)
  {
    return this.httpClient.post<Article>('http://localhost:3000/articles', article);
  }
}
