import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IArticles } from 'src/app/models/articles/articles.interface';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  articles!: IArticles;
  searchText: string = '';
  constructor(private articlesService: ArticlesService) {}
  ngOnInit(): void {
    this.getArticles();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  getArticles() {
    this.articlesService
      .getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.cutSummary(data);
        this.articles = data;
      });
  }
  cutSummary(data: IArticles) {
    data.results.forEach((item) => {
      if (item.summary.length > 100) {
        item.summary = item.summary.slice(0, 100) + '...';
      }
    });
  }
}
