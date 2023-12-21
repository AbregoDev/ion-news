import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';

import { Article } from 'src/app/interfaces/news.interface';
import { ArticleComponent } from '../article/article.component';

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IonGrid,
        IonRow,
        IonCol,
        ArticleComponent,
    ]
})
export class ArticlesComponent implements OnInit {

    @Input() articles: Article[] = [];

    constructor() { }

    ngOnInit() { }

}
