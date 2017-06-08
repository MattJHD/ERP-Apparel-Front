import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectModule } from 'ng2-select';

import { SharedModule } from '../../shared/shared.module';
import { MaterialsListComponent } from './materials-list/materials-list.component';
import { MaterialsAddComponent } from './materials-add/materials-add.component';
import { MaterialsEditComponent } from './materials-edit/materials-edit.component';

const routes: Routes = [
    { path: 'list', component: MaterialsListComponent },
    { path: 'add', component: MaterialsAddComponent },
    { path: 'edit/:id', component: MaterialsEditComponent }
];

@NgModule({
    imports: [
        SharedModule,
        SelectModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        MaterialsListComponent,
        MaterialsAddComponent,
        MaterialsEditComponent
    ],
    exports: [
        RouterModule
    ]
})
export class MaterialsModule { }
