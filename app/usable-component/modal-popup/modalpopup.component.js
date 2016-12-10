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
var ModalPopupComponent = (function () {
    function ModalPopupComponent() {
        this.closable = true;
        this.visibleChange = new core_1.EventEmitter();
    }
    ModalPopupComponent.prototype.ngOnInit = function () { };
    ModalPopupComponent.prototype.close = function () {
        debugger;
        this.visible = false;
        this.visibleChange.emit(this.visible);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ModalPopupComponent.prototype, "closable", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ModalPopupComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ModalPopupComponent.prototype, "visible", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ModalPopupComponent.prototype, "visibleChange", void 0);
    ModalPopupComponent = __decorate([
        core_1.Component({
            selector: 'modal-popup',
            templateUrl: 'app/usable-component/modal-popup/modalpopup.template.html',
            // styles:
            animations: [
                core_1.trigger('animation', [
                    core_1.transition('void => *', [
                        core_1.style({ transform: 'scale3d(.3, .3, .3)' }),
                        core_1.animate(100)
                    ]),
                    core_1.transition('* => void', [
                        core_1.animate(100, core_1.style({ transform: 'scale3d(.0, .0, .0)' }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ModalPopupComponent);
    return ModalPopupComponent;
}());
exports.ModalPopupComponent = ModalPopupComponent;
//# sourceMappingURL=modalpopup.component.js.map