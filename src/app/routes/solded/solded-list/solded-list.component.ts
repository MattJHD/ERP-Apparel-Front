import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../core/crud/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solded-list',
  templateUrl: './solded-list.component.html',
  styleUrls: ['./solded-list.component.scss']
})
export class SoldedListComponent implements OnInit {

  allSolded: any[] = [];

  constructor(private crudService: CrudService) { }
  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.crudService.getAll('articles/sales')
                    .subscribe(
                        data => {
                            this.allSolded = data;
                            console.log(this.allSolded)
                        }
                    )
  }

}
