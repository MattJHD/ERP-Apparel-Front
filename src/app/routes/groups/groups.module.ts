import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectModule } from 'ng2-select';

import { SharedModule } from '../../shared/shared.module';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupsAddComponent } from './groups-add/groups-add.component';
import { GroupsEditComponent } from './groups-edit/groups-edit.component';

const routes: Routes = [
    { path: 'list', component: GroupsListComponent },
    { path: 'add', component: GroupsAddComponent },
    { path: 'edit/:id', component: GroupsEditComponent }
];

@NgModule({
    imports: [
        SharedModule,
        SelectModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        GroupsListComponent,
        GroupsAddComponent,
        GroupsEditComponent
    ],
    exports: [
        RouterModule
    ]
})
export class GroupsModule { }
