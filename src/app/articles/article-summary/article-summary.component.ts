import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-article-summary',
  templateUrl: './article-summary.component.html',
  styleUrls: ['./article-summary.component.css']
})
export class ArticleSummaryComponent implements OnInit {
  @Input() article: Article

  idPicsum:number

  constructor() { 
    this.article = {
      title: '',
      content: '',
      author:''
    }

    this.idPicsum = Math.floor(Math.random() * 300)
  }

  ngOnInit(): void {
  }

}
