import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IArticle } from 'src/app/models/articles/article.interface';
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
  filteredArticles: IArticle[] = [];
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
        this.filteredArticles = data.results;
      });
  }
  cutSummary(data: IArticles) {
    data.results.forEach((item) => {
      if (item.summary.length > 100) {
        item.summary = item.summary.slice(0, 100) + '...';
      }
    });
  }
  applyFilter(event: Event) {
    let result: IArticle[] = [];
    let resultUnique: IArticle[] = [];
    const filteredByTitle: IArticle[] = [];
    const filteredBySummary: IArticle[] = [];
    const tmpArticle: any = {};
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    if (filterValue === '') {
      return (this.filteredArticles = this.articles.results);
    }
    const wordsFromInput = filterValue.trim().split(/\s+/);
    wordsFromInput.forEach((word: string) => {
      this.articles.results.filter((item) => {
        if (item.title.toLowerCase().includes(word)) {
          filteredByTitle.push(item);
        } else if (item.summary.toLowerCase().includes(word)) {
          filteredBySummary.push(item);
        }
      });
    });
    result = [...filteredByTitle, ...filteredBySummary];
    result.forEach((item) => {
      const key = JSON.stringify(item);
      if (!tmpArticle[key]) {
        tmpArticle[key] = true;
        resultUnique.push(item);
      }
    });
    return (this.filteredArticles = resultUnique);
  }
}
