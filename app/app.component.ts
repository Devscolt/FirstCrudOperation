import {Component} from '@angular/core';
import { NotificationService } from './shared/ToastNotification/notification.service';


@Component({
  selector: 'body',
  // styleUrls:['assets/stylesheet/left-navbar.css'],
  template: `
  
<navbar></navbar>
    `,
  providers: [NotificationService]
})

export class AppComponent {
} 