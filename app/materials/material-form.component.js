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
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var material_service_1 = require('./material.service');
var material_1 = require('./material');
var sharedata_service_1 = require('./sharedata.service');
var basicValidators_1 = require('../shared/CustomValidators/basicValidators');
var notification_service_1 = require('../shared/ToastNotification/notification.service');
var notification_1 = require('../shared/ToastNotification/notification');
var globalMessage = require('../shared/global.messages');
var MaterialFormComponent = (function () {
    function MaterialFormComponent(fb, route, router, _notify, _service, _sharedService) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this._notify = _notify;
        this._service = _service;
        this._sharedService = _sharedService;
        this.events = [];
        this.material = new material_1.Material(); //// Material model used for add/edit/delete
        this.materialForm = this.fb.group({
            MaterialId: [],
            Name: ['', [forms_1.Validators.minLength(5), basicValidators_1.BasicValidators.required]],
            Code: ['', forms_1.Validators.required],
            Description: [],
            Image: [],
            Barcode: [],
        });
    }
    MaterialFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = params["id"];
        });
        if (this.id > 0) {
            this.title = "Edit Material";
        }
        else {
            this.title = "Add Material";
        }
        if (!this.id) {
            return;
        }
        this._service.getMaterials(this.id) //// If id is passed get material for edit.
            .subscribe(function (material) {
            _this.material = material;
            // this.MapFormToModel(this.materialForm.controls, material);
            var Form = (_this.materialForm);
            if (_this.id > 0) {
                _this.materialForm.setValue(material, { onlySelf: false });
            }
        });
    };
    MaterialFormComponent.prototype.save = function (model, isValid) {
        var _this = this;
        var result;
        this._service.insertUpdateMaterial(model)
            .subscribe(function (data) {
            if (data == 1) {
                _this._sharedService.SetData(globalMessage.MessageType.Success, globalMessage.Messages.Success);
                _this.router.navigate(["materials"]);
            }
            else if (data == 2) {
                _this._notify.add(new notification_1.Notification(globalMessage.MessageType.Fail, globalMessage.Messages.Exists));
            }
            else {
                _this._sharedService.SetData(globalMessage.MessageType.Fail, globalMessage.Messages.Exists);
            }
        });
    };
    MaterialFormComponent.prototype.routerCanDeactivate = function (next, previous) {
        debugger;
        return confirm("Are u sure?");
    };
    MaterialFormComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/materials/material-form.component.html',
            providers: [material_service_1.MaterialService, basicValidators_1.BasicValidators, notification_service_1.NotificationService]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.ActivatedRoute, router_1.Router, notification_service_1.NotificationService, material_service_1.MaterialService, sharedata_service_1.ShareDataService])
    ], MaterialFormComponent);
    return MaterialFormComponent;
}());
exports.MaterialFormComponent = MaterialFormComponent;
//# sourceMappingURL=material-form.component.js.map