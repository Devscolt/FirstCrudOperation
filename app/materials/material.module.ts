import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import {MaterialComponent} from './material.component';
import {MaterialListComponent} from './material-list.component';
import {MaterialFormComponent} from './material-form.component';

import {MaterialRoutingModule} from './material-routing.module';

import { NotificationsComponents } from '../shared/ToastNotification/notification.component';
import {ModalPopupComponent  } from '../usable-component/modal-popup/modalpopup.component';


@NgModule({
    imports: [
        CommonModule,
        MaterialRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        MaterialComponent,
        MaterialListComponent,
        MaterialFormComponent,
        NotificationsComponents,
        ModalPopupComponent,
    ]
})

export class MaterialModule {

}