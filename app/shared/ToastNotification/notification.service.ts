import {Injectable} from '@angular/core'
import {Subject } from 'rxjs/Subject';

import {Notification} from './notification';

@Injectable()
export class NotificationService {
    private _Notifications = new Subject<Notification>();

    public noteAdded = this._Notifications.asObservable();

    public add(notification: Notification) {
        this._Notifications.next(notification);
    }
}
