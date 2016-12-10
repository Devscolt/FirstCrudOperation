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
var router_1 = require('@angular/router');
var material_service_1 = require('./material.service');
var material_1 = require('./material');
var sharedata_service_1 = require('./sharedata.service');
var globalMessage = require('../shared/global.messages');
var notification_service_1 = require('../shared/ToastNotification/notification.service');
var notification_1 = require('../shared/ToastNotification/notification');
var MaterialListComponent = (function () {
    function MaterialListComponent(_service, _notify, _sharedService, _router) {
        this._service = _service;
        this._notify = _notify;
        this._sharedService = _sharedService;
        this._router = _router;
        this.objDeleteMaterial = new material_1.Material(); ///Object that is used for delete material
    }
    MaterialListComponent.prototype.ngOnInit = function () {
        if (this._sharedService.dataPassed) {
            this._notify.add(new notification_1.Notification(this._sharedService.dataPassed.type, this._sharedService.dataPassed.message));
        }
        this.bindGrid();
    };
    MaterialListComponent.prototype.bindGrid = function () {
        var _this = this;
        this._service.getMaterials(0)
            .subscribe(function (materials) { return _this.materials = materials; });
    };
    MaterialListComponent.prototype.confirmDelete = function () {
        this.showDialog = false; /// Close dialog
        this.deleteMaterial(this.objDeleteMaterial);
    };
    MaterialListComponent.prototype.deleteMaterial = function (material) {
        var _this = this;
        var flag = 0;
        this._service.insertUpdateMaterial(material, true)
            .subscribe(function (data) {
            if (data == 1) {
                _this._notify.add(new notification_1.Notification(globalMessage.MessageType.Success, globalMessage.Messages.Deleted));
                _this.bindGrid(); //// Bind grid again, issue :  still not found how to reload component
            }
        });
    };
    MaterialListComponent.prototype.ngOnDestroy = function () {
        this._sharedService.dataPassed = null;
        this.objDeleteMaterial = null;
    };
    MaterialListComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/materials/material-list.component.html',
            providers: [material_service_1.MaterialService, notification_service_1.NotificationService],
        }), 
        __metadata('design:paramtypes', [material_service_1.MaterialService, notification_service_1.NotificationService, sharedata_service_1.ShareDataService, router_1.Router])
    ], MaterialListComponent);
    return MaterialListComponent;
}());
exports.MaterialListComponent = MaterialListComponent;
//# sourceMappingURL=material-list.component.js.map