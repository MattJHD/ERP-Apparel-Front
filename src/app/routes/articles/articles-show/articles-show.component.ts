import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../core/crud/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-articles-show',
  templateUrl: './articles-show.component.html',
  styleUrls: ['./articles-show.component.scss']
})
export class ArticlesShowComponent implements OnInit {

  id: number;
  private sub: any;

  article: any[] = [];

  constructor(
    private crudService: CrudService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
      this.sub = this.route.params.subscribe(params => {
          this.id = +params['id'];
          this.getArticle(this.id);
      });
  }

  getArticle(id) {
    this.crudService.getById('article', id)
                    .subscribe(
                        data => {
                            this.article = data;
                            console.log(this.article)
                        }
                    )
  }

}
