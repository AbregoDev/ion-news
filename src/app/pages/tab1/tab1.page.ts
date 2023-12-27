import { Component, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { NewsService } from 'src/app/services/news.service';
import { Article } from 'src/app/interfaces/news.interface';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from 'src/app/components/articles/articles.component';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonInfiniteScroll,
        IonInfiniteScrollContent,
        ArticlesComponent,
    ],
})
export class Tab1Page implements OnInit {

    articles: Article[] = [];
    @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll!: IonInfiniteScroll;

    constructor(private newsService: NewsService) { }

    ngOnInit(): void {
        this.newsService.getTopHeadlines().subscribe(data => {
            this.articles = data;
        });
    }

    loadData() {
        this.newsService.getTopHeadlines(true)
            .subscribe(articles => {
                if (articles.length === this.articles.length) {
                    this.infiniteScroll.disabled = true;
                    return;
                }

                this.articles = articles;
                this.infiniteScroll.complete();
            });
    }
}
