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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var Material_1 = require('./Material');
var globalVariables = require('../shared/global.variables');
var MaterialService = (function () {
    function MaterialService(_http) {
        this._http = _http;
        this.apiUrl = globalVariables.apiUrl + "MaterialsAPI/";
        this.webUrl = globalVariables.webUrl + "Materials/";
    }
    MaterialService.prototype.getMaterials = function (materialId) {
        if (materialId > 0) {
            return this._http.get(this.apiUrl + "GetMaterials?materialId=" + materialId)
                .map(function (res) { return res.json()[0]; });
        }
        else {
            return this._http.get(this.apiUrl + "GetMaterials")
                .map(function (res) { return res.json(); });
        }
    };
    MaterialService.prototype.extractData = function (res) {
        var body = res.json();
        return body[0];
    };
    MaterialService.prototype.insertUpdateMaterial = function (material, isDetele) {
        if (isDetele === void 0) { isDetele = false; }
        debugger;
        var data;
        var materialModel = new Material_1.Material();
        if (isDetele) {
            materialModel.MaterialId = material.MaterialId;
            material = materialModel;
        }
        var error;
        var body = JSON.stringify(material);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json', async: false });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(this.apiUrl + "InsertUpdateMaterial/", body, options)
            .map(function (res) {
            // If request fails, throw an Error that will be caught
            if (res.status < 200 || res.status >= 300) {
                throw new Error('This request has failed ' + res.status);
            }
            else {
                return res.json();
            }
        });
        // .subscribe(
        // (data) => this.data = data, // Reach here if res.status >= 200 && <= 299
        // (err) => this.error = err);
        // .catch(this.handleError);
    };
    MaterialService.prototype.handleError = function (error) {
        console.error(error);
    };
    MaterialService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MaterialService);
    return MaterialService;
}());
exports.MaterialService = MaterialService;
//# sourceMappingURL=material.service.js.map