"use strict";
var Notification = (function () {
    function Notification(type, message) {
        if (type === void 0) { type = ''; }
        if (message === void 0) { message = ''; }
        this.type = type;
        this.message = message;
    }
    return Notification;
}());
exports.Notification = Notification;
//# sourceMappingURL=notification.js.map