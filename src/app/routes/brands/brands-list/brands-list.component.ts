import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../core/crud/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.scss']
})
export class BrandsListComponent implements OnInit {

  brands: any[] = [];

  constructor(private crudService: CrudService) { }
  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.crudService.getAll('brands')
                    .subscribe(
                        data => {
                            this.brands = data;
                            console.log(this.brands)
                        }
                    )
  }

}
