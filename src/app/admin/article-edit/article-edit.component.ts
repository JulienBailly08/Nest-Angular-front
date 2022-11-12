import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { Article } from 'src/app/models/article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {
  @Input()
  article4Form!: Article
  @Output() updateSucess = new EventEmitter<string>();
  response$:any;
  erreurPourInfo = null;
  articleForm!: FormGroup;

  constructor(private fb: FormBuilder, private articleService: ArticleService, private router: Router) {
   }

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      _id:[this.article4Form._id],
      title: [this.article4Form.title,Validators.required],
      content: [this.article4Form.content, [Validators.required, Validators.minLength(8)]],
      author:[this.article4Form.author],
    })
  }
  onSubmit() {
    //subscribe gérer dans le template avec | async
    this.response$ = this.articleService
      .updateArticle(this.articleForm.value)
      .pipe(
        catchError(errorPotentielle => {
          this.erreurPourInfo = errorPotentielle;
          // empty renvoi un observable vide qui passe automatiquement à next()
          return EMPTY;
        }),
        tap((res) => {
          if (res._id) {
            this.updateSucess.emit('yop');
            console.log(this.updateSucess.emit('yop'));
          }
        })
      );
  }
  get title() {
    return this.articleForm.get('title');
  }
  get content() {
    return this.articleForm.get('content');
  }

}
