import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonInfiniteScroll,
    IonInfiniteScrollContent
} from '@ionic/angular/standalone';
import { ArticlesComponent } from 'src/app/components/articles/articles.component';
import { Article } from 'src/app/interfaces/news.interface';
import { NewsService } from 'src/app/services/news.service';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonSegment,
        IonSegmentButton,
        IonLabel,
        IonInfiniteScroll,
        IonInfiniteScrollContent,
        ArticlesComponent,
    ]
})
export class Tab2Page implements OnInit {

    @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll!: IonInfiniteScroll;
    categories: readonly string[] = [
        'business',
        'entertainment',
        'general',
        'health',
        'science',
        'sports',
        'technology',
    ];
    selectedCategory: string = this.categories[0];
    articles: Article[] = [];

    constructor(private newsService: NewsService) { }

    ngOnInit(): void {
        this.getTopHeadLinesByCategory(this.selectedCategory);
    }

    segmentChanged(event: Event) {
        this.selectedCategory = (event as CustomEvent).detail.value;
        this.getTopHeadLinesByCategory(this.selectedCategory);
    }

    getTopHeadLinesByCategory(category: string) {
        this.newsService.getTopHeadLinesByCategory(category)
            .subscribe(articles => {
                this.articles = [...articles];
            });
    }

    loadData() {
        this.newsService.getTopHeadLinesByCategory(this.selectedCategory, true)
            .subscribe(articles => {
                if (articles.length === this.articles.length) {
                    this.infiniteScroll.disabled = true;
                    return;
                }
                
                this.articles = articles;
                this.infiniteScroll.complete();
            })
    }
}
