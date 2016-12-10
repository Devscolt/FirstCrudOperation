import {Component} from '@angular/core';

import {NotificationService} from './notification.service';
import {Notification} from './notification';

@Component({
    selector: 'notifications',
    styles:[`
    .notifications {
    position: fixed;
    top: 3%;
    right:20px;

    div {
        border: 1px solid;
        border-radius: 4px;
        box-shadow: 0 12px 15px 0 rgba(0, 0, 0, .22),
                    0 17px 20px 0 rgba(0, 0, 0, .12);
        cursor: pointer;
        margin-bottom: .5em;
        min-height: 3em;
        padding: 1em;
        text-align: center;
        width: 300px;

        &.success {
            background-color: $success;
            border-color: darken($success, 30%);
            color: darken($success, 60%);
        }

        &.error {
            background-color: $error;
            border-color: darken($error, 10%);
            color: darken($error, 60%);
        }

        &.warn {
            background-color: $warn;
            border-color: darken($warn, 30%);
            color: darken($warn, 57%);
        }

        &.info {
            background-color: $info;
            border-color: darken($info, 30%);
            color: darken($info, 50%);
        }
    }
}`],//  
    template:`
    <div  class="notifications" >
        <div  (click)="hide(note)" class="alert alert-{{ note.type }}" 
                *ngFor="let note of _notes">
            {{ note.message }}
        </div>
    </div>
    `
})

export class NotificationsComponents {
    private _notes: Notification[];

    constructor(private _notifications: NotificationService) {
        this._notes = new Array<Notification>();

        _notifications.noteAdded.subscribe(note => {
            this._notes.push(note);

            setTimeout(() => { this.hide.bind(this)(note) }, 6000);
        });
    }

    private hide(note) {
        let index = this._notes.indexOf(note);

        if (index >= 0) {
            this._notes.splice(index, 1);
        }
    }
}