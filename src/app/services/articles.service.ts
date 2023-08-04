import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticles } from '../models/articles/articles.interface';
import { baseUrl } from 'src/environments/environment.development';
import { IArticle } from '../models/articles/article.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient) {}
  public getAll(): Observable<IArticles> {
    return this.http.get<IArticles>(`${baseUrl}articles/?limit=20`);
  }
  public getOne(id: number): Observable<IArticle> {
    return this.http.get<IArticle>(`${baseUrl}articles/${id}`);
  }
}
