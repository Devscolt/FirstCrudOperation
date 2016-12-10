import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NavbarComponent} from './navbar.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {HttpModule} from '@angular/http';
// import {SimpleNotificationsModule} from './shared/ToastNotification/simple-notifications.module'
// import { NotificationsComponents } from './shared/ToastNotification/notification.component';


///Material theme
// import {ma} from 'ng2-material/all'

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        ReactiveFormsModule,
        FormsModule,
        // SimpleNotificationsModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        // NotificationsComponents
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}