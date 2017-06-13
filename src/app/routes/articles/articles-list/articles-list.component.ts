import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../core/crud/crud.service';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
    // TOASTER
    toaster: any;
    toasterConfig: any;
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        showCloseButton: true
    });

  articles: any[] = [];

  //PERMS
  permAddArticle: boolean = false;
  permAddSolded: boolean = false

  currUser = JSON.parse(localStorage.getItem('apparelUser'));

  constructor(private crudService: CrudService,private toasterService: ToasterService) { }

  public totalItems: number = 64;
  public currentPage: number = 4;
  public maxSize: number = 5;

  public pageChanged(event: any): void {
      console.log('Page changed to: ' + event.page);
      console.log('Number items per page: ' + event.itemsPerPage);
  };

  ngOnInit() {
      this.permAddArticle = this.checkPerm(this.currUser['role']['permissions'], 'add_article');
      this.permAddSolded = this.checkPerm(this.currUser['role']['permissions'], 'add_solded');
      this.getAll();
  }

    checkPerm(arr, val) {
        return arr.some(function(arrVal) {
            return val === arrVal.libelle;
        });
    }

  getAll() {
    this.crudService.getAll('articles')
                    .subscribe(
                        data => {
                            this.articles = data;
                            console.log(this.articles)
                        }
                    )
  }

  articleSolded(article) {
      this.crudService.create('articles/sales', {article: article, sold_by: this.currUser})
                      .subscribe(
                          success => {
                              this.toasterService.pop('success', 'Solded', 'Solded Success');
                              return this.getAll();
                          },
                          error => { 
                              return this.toasterService.pop('error', 'Solded', 'Error Sever');
                          }   
                      )
  }

}
