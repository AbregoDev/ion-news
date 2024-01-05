import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';
import { StorageService } from 'src/app/services/storage.service';
import { Article } from 'src/app/interfaces/news.interface';
import { ArticlesComponent } from 'src/app/components/articles/articles.component';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss'],
    standalone: true,
    imports: [
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        ArticlesComponent,
        ExploreContainerComponent
    ],
})
export class Tab3Page {

    get articles(): Article[] {
        return this.storageService.localArticles;
    }

    constructor(private storageService: StorageService) { }


}
