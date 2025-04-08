import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonItem, IonList, IonContent, IonTitle, IonToolbar, IonHeader, IonMenu, IonRouterLink } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonApp, IonRouterOutlet, IonMenu, IonRouterLink],
})
export class AppComponent {
  constructor() {} 
}
