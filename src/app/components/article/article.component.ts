import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonIcon,
    IonImg,
    IonRow
} from '@ionic/angular/standalone';

import { Article } from 'src/app/interfaces/news.interface';

import { addIcons } from 'ionicons';
import { ellipsisVerticalOutline } from 'ionicons/icons';
import { Browser } from '@capacitor/browser';

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
        IonRow,
        IonCol,
        IonButton,
        IonIcon,
    ],
})
export class ArticleComponent {

    @Input() index: number = 0;
    @Input() article!: Article;

    constructor() {
        addIcons({ ellipsisVerticalOutline });
    }

    openArticle() {
        Browser.open({ url: this.article.url });
    }

    openOptions() { }
}
