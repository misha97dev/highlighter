import { IArticle } from './article.interface';

export interface IArticles {
  count: number;
  next: string;
  previous: string;
  results: IArticle[];
}
