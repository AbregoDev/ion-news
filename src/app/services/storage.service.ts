import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/news.interface';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    private _storage: Storage | null = null;
    private _articles: Article[] = [];
    
    private readonly ARTICLES_KEY = 'articles';

    get localArticles(): Article[] {
        return [...this._articles];
    }

    constructor(private storage: Storage) {
        this.init();
    }

    async init() {
        const storage = await this.storage.create();
        this._storage = storage;

        this.loadFavorites();
    }

    async saveRemoveArticle(article: Article) {
        const articleAlreadyExists = this._articles.find(localArticle => localArticle.title === article.title);

        if (articleAlreadyExists) {
            this._articles = this._articles.filter(localArticle => localArticle.title !== article.title);
        } else {
            this._articles = [article, ...this._articles];
        }

        this._storage!.set(this.ARTICLES_KEY, this._articles);
    }

    async loadFavorites() {
        try {
            const articles = await this._storage!.get(this.ARTICLES_KEY);
            this._articles = articles || [];
        } catch(error) { }
    }

    isArticleInFavorites(article: Article): boolean {
        return this._articles.some(localArticle => localArticle.title === article.title);
    }
}
