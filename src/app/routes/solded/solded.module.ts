import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectModule } from 'ng2-select';

import { SharedModule } from '../../shared/shared.module';
import { SoldedListComponent } from './solded-list/solded-list.component';
import { SoldedShowComponent } from './solded-show/solded-show.component';

const routes: Routes = [
    { path: 'list', component: SoldedListComponent },
    { path: 'show/:id', component: SoldedShowComponent }
];

@NgModule({
    imports: [
        SharedModule,
        SelectModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        SoldedListComponent,
        SoldedShowComponent
    ],
    exports: [
        RouterModule
    ]
})
export class SoldedModule { }
