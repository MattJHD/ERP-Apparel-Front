import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectModule } from 'ng2-select';

import { SharedModule } from '../../shared/shared.module';
import { ColorsListComponent } from './colors-list/colors-list.component';
import { ColorsAddComponent } from './colors-add/colors-add.component';
import { ColorsEditComponent } from './colors-edit/colors-edit.component';

const routes: Routes = [
    { path: 'list', component: ColorsListComponent },
    { path: 'add', component: ColorsAddComponent },
    { path: 'edit/:id', component: ColorsEditComponent }
];

@NgModule({
    imports: [
        SharedModule,
        SelectModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ColorsListComponent,
        ColorsAddComponent,
        ColorsEditComponent
    ],
    exports: [
        RouterModule
    ]
})
export class ColorsModule { }
