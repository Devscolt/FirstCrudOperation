"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var notification_service_1 = require('./notification.service');
var NotificationsComponents = (function () {
    function NotificationsComponents(_notifications) {
        var _this = this;
        this._notifications = _notifications;
        this._notes = new Array();
        _notifications.noteAdded.subscribe(function (note) {
            _this._notes.push(note);
            setTimeout(function () { _this.hide.bind(_this)(note); }, 6000);
        });
    }
    NotificationsComponents.prototype.hide = function (note) {
        var index = this._notes.indexOf(note);
        if (index >= 0) {
            this._notes.splice(index, 1);
        }
    };
    NotificationsComponents = __decorate([
        core_1.Component({
            selector: 'notifications',
            styles: ["\n    .notifications {\n    position: fixed;\n    top: 3%;\n    right:20px;\n\n    div {\n        border: 1px solid;\n        border-radius: 4px;\n        box-shadow: 0 12px 15px 0 rgba(0, 0, 0, .22),\n                    0 17px 20px 0 rgba(0, 0, 0, .12);\n        cursor: pointer;\n        margin-bottom: .5em;\n        min-height: 3em;\n        padding: 1em;\n        text-align: center;\n        width: 300px;\n\n        &.success {\n            background-color: $success;\n            border-color: darken($success, 30%);\n            color: darken($success, 60%);\n        }\n\n        &.error {\n            background-color: $error;\n            border-color: darken($error, 10%);\n            color: darken($error, 60%);\n        }\n\n        &.warn {\n            background-color: $warn;\n            border-color: darken($warn, 30%);\n            color: darken($warn, 57%);\n        }\n\n        &.info {\n            background-color: $info;\n            border-color: darken($info, 30%);\n            color: darken($info, 50%);\n        }\n    }\n}"],
            template: "\n    <div  class=\"notifications\" >\n        <div  (click)=\"hide(note)\" class=\"alert alert-{{ note.type }}\" \n                *ngFor=\"let note of _notes\">\n            {{ note.message }}\n        </div>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [notification_service_1.NotificationService])
    ], NotificationsComponents);
    return NotificationsComponents;
}());
exports.NotificationsComponents = NotificationsComponents;
//# sourceMappingURL=notification.component.js.map