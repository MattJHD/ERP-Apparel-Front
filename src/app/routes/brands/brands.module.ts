import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectModule } from 'ng2-select';

import { SharedModule } from '../../shared/shared.module';
import { BrandsListComponent } from './brands-list/brands-list.component';
import { BrandsAddComponent } from './brands-add/brands-add.component';
import { BrandsEditComponent } from './brands-edit/brands-edit.component';

const routes: Routes = [
    { path: 'list', component: BrandsListComponent },
    { path: 'add', component: BrandsAddComponent },
    { path: 'edit/:id', component: BrandsEditComponent }
];

@NgModule({
    imports: [
        SharedModule,
        SelectModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        BrandsListComponent,
        BrandsAddComponent,
        BrandsEditComponent
    ],
    exports: [
        RouterModule
    ]
})
export class BrandsModule { }
