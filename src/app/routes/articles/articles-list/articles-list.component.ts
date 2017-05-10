import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../core/crud/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

  articles: any[] = [];

  constructor(private crudService: CrudService) { }

  public totalItems: number = 64;
  public currentPage: number = 4;
  public maxSize: number = 5;

  public pageChanged(event: any): void {
      console.log('Page changed to: ' + event.page);
      console.log('Number items per page: ' + event.itemsPerPage);
  };

  ngOnInit() {
    this.getAll();
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

}
