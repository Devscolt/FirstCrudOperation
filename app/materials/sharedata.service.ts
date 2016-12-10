import {Injectable} from '@angular/core'
import {Material} from './material'


export class Notifiy {
    type: string;
    message: string
}

@Injectable()
export class ShareDataService {
    notify: Notifiy
    dataPassed = new Notifiy();
    SetData(type, msg) {
        var newMessage = new Notifiy();

        newMessage.type = type;
        newMessage.message = msg;
        this.dataPassed=newMessage;
    }
}