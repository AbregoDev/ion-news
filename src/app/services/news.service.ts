import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article, NewsResponse } from '../interfaces/news.interface';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    readonly baseUrl = 'https://newsapi.org/v2';

    constructor(private readonly http: HttpClient) { }

    getTopHeadlines(): Observable<Article[]> {
        const url = `${this.baseUrl}/top-headlines?country=us&category=business`;
        const params = { apiKey: environment.apiKey };
        return this.http.get<NewsResponse>(url, { params }).pipe(
            map(response => response.articles)
        );
    }
}
