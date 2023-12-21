import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonImg } from '@ionic/angular/standalone';
import { Article } from 'src/app/interfaces/news.interface';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        IonCard,
        IonCardSubtitle,
        IonCardTitle,
        IonCardContent,
        IonImg,
    ],
})
export class ArticleComponent implements OnInit {

    @Input() index: number = 0;
    @Input() article!: Article;

    constructor() { }

    ngOnInit() { }

}
