import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, tap } from 'rxjs';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css']
})
export class ArticleNewComponent implements OnInit {
  response$:any;
  erreurPourInfo = null;

  constructor(private fb: FormBuilder, private articleService:ArticleService, private router:Router) { }

  articleForm: FormGroup = this.fb.group({
    title: ['',Validators.required],
    content: ['',[Validators.required,Validators.minLength(8)]]
  })

  ngOnInit(): void {
  }

  onSubmit() {
    //subscribe gérer dans le template avec | async
    this.response$ = this.articleService
      .createArticle(this.articleForm.value)
      .pipe(
        catchError(errorPotentielle => {
          this.erreurPourInfo = errorPotentielle;
          // empty renvoi un observable vide qui passe automatiquement à next()
          return EMPTY;
        }),
        tap((res) =>{
          if (res._id) {
            this.articleForm.reset();
            this.router.navigateByUrl('/articles');
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
