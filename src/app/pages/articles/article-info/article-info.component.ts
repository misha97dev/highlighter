import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IArticle } from 'src/app/models/articles/article.interface';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-article-info',
  templateUrl: './article-info.component.html',
  styleUrls: ['./article-info.component.scss'],
})
export class ArticleInfoComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  id: any;
  article!: IArticle;
  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params) => {
        this.id = params.get('id');
      });
    this.getArticle(this.id);
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  getArticle(id: number) {
    this.articlesService
      .getOne(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.article = data;
      });
  }
}
