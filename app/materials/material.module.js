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
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var material_component_1 = require('./material.component');
var material_list_component_1 = require('./material-list.component');
var material_form_component_1 = require('./material-form.component');
var material_routing_module_1 = require('./material-routing.module');
var notification_component_1 = require('../shared/ToastNotification/notification.component');
var modalpopup_component_1 = require('../usable-component/modal-popup/modalpopup.component');
var MaterialModule = (function () {
    function MaterialModule() {
    }
    MaterialModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                material_routing_module_1.MaterialRoutingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
            ],
            declarations: [
                material_component_1.MaterialComponent,
                material_list_component_1.MaterialListComponent,
                material_form_component_1.MaterialFormComponent,
                notification_component_1.NotificationsComponents,
                modalpopup_component_1.ModalPopupComponent,
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], MaterialModule);
    return MaterialModule;
}());
exports.MaterialModule = MaterialModule;
//# sourceMappingURL=material.module.js.map