import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { catchError, EMPTY, throwError } from 'rxjs';
import { ArticleService } from 'src/app/admin/article.service';
import { Article } from 'src/app/models/article';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-article-summary',
  templateUrl: './article-summary.component.html',
  styleUrls: ['./article-summary.component.css'],
  animations: [
    trigger('fade', [
      // transition('void => active', [ // using status here for transition
      //   style({ opacity: 0 }),
      //   animate(1000, style({ opacity: 1 }))
      // ]),
      transition('false => true', [
        animate(1000, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ArticleSummaryComponent implements OnInit {

  isWaitingForServerResponse = false;
  error = null;
  isDelete = false;
  animationDone = false;
  @Output() deleteSucess = new EventEmitter<string>();
  @Input() article: Article

  idPicsum:number

  constructor(private articleService:ArticleService) { 
    this.article = {
      title: '',
      content: '',
      author:''
    }

    this.idPicsum = Math.floor(Math.random() * 150)
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
    this.isDelete = true;
    setTimeout(() => {
      this.animationDone = true;
    }, 1000);
    setTimeout(() => {
      this.deleteSucess.emit(data._id);
    }, 2000);
  }

  ngOnInit(): void {
  }

}
