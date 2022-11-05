import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css']
})
export class ArticleNewComponent implements OnInit {
  response$: any;

  constructor(private fb: FormBuilder, private articleService:ArticleService, private router:Router) { }

  articleForm: FormGroup = this.fb.group({
    title: ['',Validators.required],
    content: ['',[Validators.required,Validators.minLength(8)]]
  })

  ngOnInit(): void {
  }

  onSubmit() {
    this.response$ = this.articleService.createArticle(this.articleForm.value).subscribe();
    this.articleForm.reset();
    this.router.navigateByUrl('/articles');
  }

  get title() {
    return this.articleForm.get('title');
  }
  get content() {
    return this.articleForm.get('content');
  }
}
