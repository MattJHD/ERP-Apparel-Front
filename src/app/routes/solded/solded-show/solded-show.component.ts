import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { CrudService } from '../../../core/crud/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

import { SelectComponent } from 'ng2-select/select/select';

@Component({
  selector: 'app-solded-show',
  templateUrl: './solded-show.component.html',
  styleUrls: ['./solded-show.component.scss']
})
export class SoldedShowComponent implements OnInit {

    // TOASTER
    toaster: any;
    toasterConfig: any;
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        showCloseButton: true
    });


    currUser = JSON.parse(localStorage.getItem('apparelUser'));

    id: number;
    private sub: any;

    solded = {};

    constructor(
        private route: ActivatedRoute,
        private crudService: CrudService,
        private router: Router ) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.getSolded(this.id);
        });
    }

    getSolded(id) {
        this.crudService.getById('articles/sales', id)
                        .subscribe(
                            data => {
                                this.solded = data;
                                console.log(this.solded)
                            }
                        )

    }
}
