import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { catchError, EMPTY, throwError } from 'rxjs';
import { ArticleService } from 'src/app/admin/article.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-article-summary',
  templateUrl: './article-summary.component.html',
  styleUrls: ['./article-summary.component.css']
})
export class ArticleSummaryComponent implements OnInit {

  isWaitingForServerResponse = false;
  error = null;
  @Output() deleteSucess = new EventEmitter<string>();
  @Input() article: Article

  idPicsum:number

  constructor(private articleService:ArticleService) { 
    this.article = {
      title: '',
      content: '',
      author:''
    }

    this.idPicsum = Math.floor(Math.random() * 300)
  }
  donothing() {
    
  }
  effacerArticle()
  {
    this.isWaitingForServerResponse = true
    this.articleService.deleteArticle(this.article)
      .pipe(
        catchError(this.handleError)
    )
      .subscribe(
        data => {
          this.isWaitingForServerResponse = false;
          this.supressionOK(data);
        },
        err => {
          this.isWaitingForServerResponse = false;
          this.handleError(err);
        }
    )
  }

  handleError(err: null) {
    this.error = err;
    return EMPTY;
  }
  supressionOK(data: Article)
  {
    this.deleteSucess.emit(data._id);
  }

  ngOnInit(): void {
  }

}
