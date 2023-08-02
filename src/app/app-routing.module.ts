import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ArticleInfoComponent } from './pages/articles/article-info/article-info.component';

const routes: Routes = [
  {
    path: 'articles',
    component: ArticlesComponent,
  },
  {
    path: 'articles/:id',
    component: ArticleInfoComponent,
  },
  {
    path: '**',
    redirectTo: 'articles',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
