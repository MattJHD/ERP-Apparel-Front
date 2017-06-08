import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../core/crud/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-materials-list',
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss']
})
export class MaterialsListComponent implements OnInit {

  materials: any[] = [];

  constructor(private crudService: CrudService) { }
  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.crudService.getAll('materials')
                    .subscribe(
                        data => {
                            this.materials = data;
                            console.log(this.materials)
                        }
                    )
  }

}
