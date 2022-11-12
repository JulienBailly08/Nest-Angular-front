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
  reloadPage() {
    this.chargerArticles();
  }

  reloadArticle(_id: string) {
    this.chargerArticles();
  }

}
