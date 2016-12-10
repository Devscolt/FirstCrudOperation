import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '*', redirectTo: '/materials', pathMatch: 'full' },
            
            { path: '', redirectTo: '/materials', pathMatch: 'full' },
            { path: 'materials', loadChildren: 'app/materials/material.module#MaterialModule' },
            // { path: '', redirectTo: '/tasks', pathMatch: 'full' },
            // { path: 'tasks', loadChildren: 'app/tasks/tasks.module#TasksModule' },
            // { path: 'users', loadChildren: 'app/users/users.module#UsersModule' }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}