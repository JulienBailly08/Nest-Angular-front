import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/admin/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})

export class ArticlesComponent implements OnInit {
  articles$: Observable<any[]> | undefined ;

  constructor(private articleService:ArticleService) { }

  ngOnInit(): void {
    this.chargerArticles();
  }

  chargerArticles()
  {
    this.articles$ = this.articleService.getArticles();
  }

  reloadArticle(_id: string) {
    // @todo
    // cibler l'enfant avec l'_id => le faire disparaitre avec classe puis recharger la requete get
    this.chargerArticles();
  }

}
