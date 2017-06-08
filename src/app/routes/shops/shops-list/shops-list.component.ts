import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../core/crud/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shops-list',
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.scss']
})
export class ShopsListComponent implements OnInit {

  shops: any[] = [];

  constructor(private crudService: CrudService) { }
  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.crudService.getAll('shops')
                    .subscribe(
                        data => {
                            this.shops = data;
                            console.log(this.shops)
                        }
                    )
  }

}
