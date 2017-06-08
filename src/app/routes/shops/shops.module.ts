import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectModule } from 'ng2-select';

import { SharedModule } from '../../shared/shared.module';
import { ShopsListComponent } from './shops-list/shops-list.component';
import { ShopsAddComponent } from './shops-add/shops-add.component';
import { ShopsEditComponent } from './shops-edit/shops-edit.component';

const routes: Routes = [
    { path: 'list', component: ShopsListComponent },
    { path: 'add', component: ShopsAddComponent },
    { path: 'edit/:id', component: ShopsEditComponent }
];

@NgModule({
    imports: [
        SharedModule,
        SelectModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ShopsListComponent,
        ShopsAddComponent,
        ShopsEditComponent
    ],
    exports: [
        RouterModule
    ]
})
export class ShopsModule { }
