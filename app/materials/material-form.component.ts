import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ActivatedRoute, Router, CanDeactivate } from '@angular/router'

import {MaterialService} from './material.service'
import {Material} from './material'

import {ShareDataService} from './sharedata.service';
import {BasicValidators} from '../shared/CustomValidators/basicValidators'
import {NotificationService} from '../shared/ToastNotification/notification.service'
import { Notification } from '../shared/ToastNotification/notification';

import globalMessage = require('../shared/global.messages')

@Component({
    templateUrl: 'app/materials/material-form.component.html',
    providers: [MaterialService, BasicValidators, NotificationService]
})

export class MaterialFormComponent implements OnInit {
    public materialForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];
    public id: Number;
    public title: string;

    material = new Material(); //// Material model used for add/edit/delete

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private _notify: NotificationService,
        private _service: MaterialService,
        private _sharedService: ShareDataService
    ) {
        this.materialForm = this.fb.group({ //// Make Model driven form
            MaterialId: [],
            Name: ['', [<any>Validators.minLength(5), BasicValidators.required]],
            Code: ['', Validators.required],
            Description: [],
            Image: [],
            Barcode: [],

        })
    }

    private sub: any;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params["id"];
        })

        if (this.id > 0) { //// Based on id decide Title add/edit
            this.title = "Edit Material"
        } else {
            this.title = "Add Material"
        }

        if (!this.id) {
            return;
        }

        this._service.getMaterials(this.id) //// If id is passed get material for edit.
            .subscribe(material => {
                this.material = material
                // this.MapFormToModel(this.materialForm.controls, material);
                let Form = (this.materialForm);
                if (this.id > 0) { //// If valid id is found (EDIT) fill Model form by material data passed by service.
                    (<FormGroup>this.materialForm).setValue(material, { onlySelf: false });
                }
            }
            // success
            // (data) => {
            //     debugger
            //     // redirect here...
            // },
            //user => this.material = user
            // (mateial) => {
            //     debugger
            //     this.material=material
            // }
            // response => {
            //     if (response.status == 404) {
            //         this._router.navigate(['NotFound']);
            //     }
            // }
            )
    }

    save(model: Material, isValid: boolean) {
        var result;

        this._service.insertUpdateMaterial(model)
            .subscribe(data => {
                if (data == 1) {
                    this._sharedService.SetData(globalMessage.MessageType.Success, globalMessage.Messages.Success);
                    this.router.navigate(["materials"]);
                }
                else if (data == 2) {
                    this._notify.add(new Notification(globalMessage.MessageType.Fail, globalMessage.Messages.Exists));
                }
                else {
                    this._sharedService.SetData(globalMessage.MessageType.Fail, globalMessage.Messages.Exists);
                }
            }
            )
    }

    routerCanDeactivate(next, previous) {
        debugger;
        return confirm("Are u sure?");
    }


}

