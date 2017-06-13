import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../core/crud/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users-show',
  templateUrl: './users-show.component.html',
  styleUrls: ['./users-show.component.scss']
})
export class UsersShowComponent implements OnInit {

  id: number;
  private sub: any;

  user: any[] = [];

  constructor(
    private crudService: CrudService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
          this.id = +params['id'];
          this.getUser(this.id);
      });
  }

  getUser(id) {
    this.crudService.getById('users', id)
                    .subscribe(
                        data => {
                            this.user = data;
                            console.log(this.user)
                        }
                    )
  }

}
