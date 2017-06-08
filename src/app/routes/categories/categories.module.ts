import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectModule } from 'ng2-select';

import { SharedModule } from '../../shared/shared.module';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoriesAddComponent } from './categories-add/categories-add.component';
import { CategoriesEditComponent } from './categories-edit/categories-edit.component';

const routes: Routes = [
    { path: 'list', component: CategoriesListComponent },
    { path: 'add', component: CategoriesAddComponent },
    { path: 'edit/:id', component: CategoriesEditComponent }
];

@NgModule({
    imports: [
        SharedModule,
        SelectModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        CategoriesListComponent,
        CategoriesAddComponent,
        CategoriesEditComponent
    ],
    exports: [
        RouterModule
    ]
})
export class CategoriesModule { }
