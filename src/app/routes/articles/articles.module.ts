import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectModule } from 'ng2-select';

import { SharedModule } from '../../shared/shared.module';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticlesAddComponent } from './articles-add/articles-add.component';
import { ArticlesEditComponent } from './articles-edit/articles-edit.component';
import { ArticlesShowComponent } from './articles-show/articles-show.component';

const routes: Routes = [
    { path: 'list', component: ArticlesListComponent },
    { path: 'add', component: ArticlesAddComponent },
    { path: 'edit/:id', component: ArticlesEditComponent },
    { path: 'show/:id', component: ArticlesShowComponent },
];

@NgModule({
    imports: [
        SharedModule,
        SelectModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ArticlesListComponent,
        ArticlesAddComponent,
        ArticlesShowComponent,
        ArticlesEditComponent
    ],
    exports: [
        RouterModule
    ]
})
export class ArticlesModule { }
