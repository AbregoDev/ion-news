import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel
} from '@ionic/angular/standalone';

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
    ]
})
export class Tab2Page {

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

    constructor() { }

    segmentChanged(event: any) {
        
    }
}
