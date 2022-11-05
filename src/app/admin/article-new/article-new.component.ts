import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css']
})
export class ArticleNewComponent implements OnInit {
  response$: any;

  constructor(private fb: FormBuilder, private articleService:ArticleService) { }

  articleForm: FormGroup = this.fb.group({
    title: ['',Validators.required],
    content: ['',[Validators.required,Validators.minLength(8)]]
  })

  ngOnInit(): void {
  }

  async onSubmit() {
    this.response$ = await this.articleService.createArticle(this.articleForm.value).subscribe();
  }

  get title() {
    return this.articleForm.get('title');
  }
  get content() {
    return this.articleForm.get('content');
  }
}
