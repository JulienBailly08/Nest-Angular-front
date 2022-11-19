import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../models/article';
import { baseURL } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  private baseUrl = baseURL+'/articles';
  constructor(private httpClient: HttpClient) { }
  
  getArticles()
  {
    return this.httpClient.get<Article[]>(this.baseUrl);
  }

  createArticle(article:Article)
  {
    return this.httpClient.post<Article>(this.baseUrl, article,this.httpHeaders);
  }

  deleteArticle(article: Article)
  {
    return this.httpClient.delete<Article>(`${this.baseUrl}/${article._id}`);
  }

  updateArticle(article: Article)
  {
    return this.httpClient.put<Article>(`${this.baseUrl}/${article._id}`,article,this.httpHeaders);
  }
}
