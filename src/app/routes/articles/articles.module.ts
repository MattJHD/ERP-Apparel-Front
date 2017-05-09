import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectModule } from 'ng2-select';

import { SharedModule } from '../../shared/shared.module';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticlesAddComponent } from './articles-add/articles-add.component';

const routes: Routes = [
    { path: 'list', component: ArticlesListComponent },
    { path: 'add', component: ArticlesAddComponent },
];

@NgModule({
    imports: [
        SharedModule,
        SelectModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ArticlesListComponent,
        ArticlesAddComponent
    ],
    exports: [
        RouterModule
    ]
})
export class ArticlesModule { }
