import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import {Material} from './Material'

import globalVariables = require('../shared/global.variables')

@Injectable()
export class MaterialService {

    private apiUrl = globalVariables.apiUrl + "MaterialsAPI/";
    private webUrl = globalVariables.webUrl + "Materials/";


    constructor(private _http: Http) {
    }

    getMaterials(materialId) {
        if (materialId > 0) {
            return this._http.get(this.apiUrl + "GetMaterials?materialId=" + materialId)
                .map(res => res.json()[0])
            //             .map(this.extractData)
        }
        else {
            return this._http.get(this.apiUrl + "GetMaterials")
                .map(res => res.json())
        }
    }

    private extractData(res: Response) {
        let body = res.json();
        return body[0];
    }

    insertUpdateMaterial(material, isDetele = false) {
        debugger
        var data;
        var materialModel = new Material();
        if (isDetele) {
            materialModel.MaterialId = material.MaterialId;
            material = materialModel;
        }

        var error;
        let body = JSON.stringify(material);
        let headers = new Headers({ 'Content-Type': 'application/json', async: false });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(this.apiUrl + "InsertUpdateMaterial/", body, options)
            .map(res => {
                // If request fails, throw an Error that will be caught
                if (res.status < 200 || res.status >= 300) {
                    throw new Error('This request has failed ' + res.status);
                }
                // If everything went fine, return the response
                else {
                    return res.json();
                }
            })
        // .subscribe(
        // (data) => this.data = data, // Reach here if res.status >= 200 && <= 299
        // (err) => this.error = err);
        // .catch(this.handleError);


    }

    private handleError(error: Response) {
        console.error(error);
    }
}
