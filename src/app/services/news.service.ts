import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article, NewsResponse, ShownArticles } from '../interfaces/news.interface';
import { Observable, map, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    readonly baseUrl = 'https://newsapi.org/v2';
    readonly country = 'us';

    private shownArticles: ShownArticles = { };

    constructor(private readonly http: HttpClient) { }

    private executeQuery<T>(endpoint: string): Observable<T> {
        const params = {
            apiKey: environment.apiKey,
            country: this.country,
        }
        return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params });
    }

    getTopHeadlines(): Observable<Article[]> {
        return this.getTopHeadLinesByCategory('business');
    }
    
    getTopHeadLinesByCategory(category: string, loadMore: boolean = false): Observable<Article[]> {
        if (loadMore) {
            return this.getArticlesByCategory(category);
        }

        const categoryArticlesShown = this.shownArticles[category];
        if (categoryArticlesShown) {
            return of(categoryArticlesShown.articles);
        }

        return this.getArticlesByCategory(category);
    }

    private getArticlesByCategory(category: string): Observable<Article[]> {
        const isCategoryShown = Object.keys(this.shownArticles).includes(category);
        if (!isCategoryShown) {
            this.shownArticles[category] = {
                page: 0,
                articles: [],
            }
        }

        const categoryArticles = this.shownArticles[category]!;
        const page = categoryArticles.page + 1;

        const endpoint = `top-headlines?category=${category}&page=${page}`;
        return this.executeQuery<NewsResponse>(endpoint).pipe(
            map(({ articles }) => {
                if (articles.length === 0) return categoryArticles.articles;

                const newArticles = [...categoryArticles.articles, ...articles];
                this.shownArticles[category] = {
                    page,
                    articles: newArticles,
                }

                return newArticles;
            })
        );
    }
}
