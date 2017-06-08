import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../core/crud/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  categories: any[] = [];

  constructor(private crudService: CrudService) { }
  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.crudService.getAll('categories')
                    .subscribe(
                        data => {
                            this.categories = data;
                            console.log(this.categories)
                        }
                    )
  }

}
