import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ArticlesListComponent } from './articles-list/articles-list.component';

const routes: Routes = [
    { path: 'list', component: ArticlesListComponent }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ArticlesListComponent
    ],
    exports: [
        RouterModule
    ]
})
export class ArticlesModule { }
