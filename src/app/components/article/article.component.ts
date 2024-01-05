import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import {
    ActionSheetController,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonImg,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
    ellipsisVerticalOutline,
    shareOutline,
    heartOutline,
    heart,
} from 'ionicons/icons';
import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';

import { Article } from 'src/app/interfaces/news.interface';
import { StorageService } from 'src/app/services/storage.service';

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
        IonButton,
        IonIcon,
    ],
})
export class ArticleComponent {

    @Input() index: number = 0;
    @Input() article!: Article;

    constructor(
        private actionSheetCtrl: ActionSheetController,
        private storageService: StorageService,
    ) {
        addIcons({
            ellipsisVerticalOutline,
            shareOutline,
            heartOutline,
            heart,
        });
    }

    openArticle() {
        Browser.open({ url: this.article.url });
    }

    async openOptions() {
        const isFavorite = this.storageService.isArticleInFavorites(this.article);

        const actionSheet = await this.actionSheetCtrl.create({
            header: 'Opciones',
            buttons: [
                {
                    text: isFavorite ? 'Eliminar favorito' : 'Favorito',
                    icon: isFavorite ? 'heart' : 'heart-outline',
                    handler: () => this.toggleFavorite(),
                },
                {
                    text: 'Compartir',
                    icon: 'share-outline',
                    handler: () => this.shareArticle(),
                },
            ]
        });

        await actionSheet.present();
    }

    shareArticle() {
        Share.share({
            dialogTitle: 'Compartir noticia',
            title: this.article.title + ' (Via NewsAppIonic)',
            text: 'Mira esta noticia',
            url: this.article.url,
        });
    }

    toggleFavorite() {
        this.storageService.saveRemoveArticle(this.article);
    }
}
