import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectModule } from 'ng2-select';

import { SharedModule } from '../../shared/shared.module';
import { RolesListComponent } from './roles-list/roles-list.component';
import { RolesAddComponent } from './roles-add/roles-add.component';
import { RolesEditComponent } from './roles-edit/roles-edit.component';

const routes: Routes = [
    { path: 'list', component: RolesListComponent },
    { path: 'add', component: RolesAddComponent },
    { path: 'edit/:id', component: RolesEditComponent },
];

@NgModule({
    imports: [
        SharedModule,
        SelectModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        RolesListComponent,
        RolesAddComponent,
        RolesEditComponent
    ],
    exports: [
        RouterModule
    ]
})
export class RolesModule { }
