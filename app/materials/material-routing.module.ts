import {NgModule}     from '@angular/core';
import {RouterModule} from '@angular/router';

import {MaterialComponent} from './material.component';
import {MaterialListComponent} from './material-list.component';
import {MaterialFormComponent} from './material-form.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                  
            path: '',
            component: MaterialComponent,
            children: [
                {
                    path: '',
                    component: MaterialListComponent
                },
                {
                    path: ':id',
                    component: MaterialFormComponent
                }
            ]

            }
        ])
    ],
exports: [
    RouterModule
]
})

export class MaterialRoutingModule {

}