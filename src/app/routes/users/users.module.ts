import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectModule } from 'ng2-select';

import { SharedModule } from '../../shared/shared.module';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersShowComponent } from './users-show/users-show.component';

const routes: Routes = [
    { path: 'list', component: UsersListComponent },
    { path: 'add', component: UsersAddComponent },
    { path: 'edit/:id', component: UsersEditComponent },
    { path: 'show/:id', component: UsersShowComponent },
];

@NgModule({
    imports: [
        SharedModule,
        SelectModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        UsersListComponent,
        UsersAddComponent,
        UsersShowComponent,
        UsersEditComponent
    ],
    exports: [
        RouterModule
    ]
})
export class UsersModule { }
