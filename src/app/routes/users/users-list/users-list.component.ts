import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../core/crud/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: any[] = [];

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
    this.crudService.getAll('users')
                    .subscribe(
                        data => {
                            this.users = data;
                            console.log(this.users)
                        }
                    )
  }

}
