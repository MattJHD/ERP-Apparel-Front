import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { CrudService } from '../../../core/crud/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

import { SelectComponent } from 'ng2-select/select/select';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent implements OnInit {

    // TOASTER
    toaster: any;
    toasterConfig: any;
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        showCloseButton: true
    });
  
    valForm: FormGroup;

    id: number;
    private sub: any;

    category = {};

    constructor(
        private route: ActivatedRoute, 
        fb: FormBuilder,
        private toasterService: ToasterService,
        private crudService: CrudService,
        private router: Router ) {
            // Model Driven validation
            this.valForm = fb.group({
                'name': [null]
            });
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.getCategory(this.id);
        });
    }

    getCategory(id) {
        this.crudService.getById('categories', id)
                        .subscribe(
                            data => {
                                this.category = data;
                                console.log(this.category)
                            }
                        )
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {

            if(value['name'] == null) {
                return this.toasterService.pop('error', 'Name', 'Invalid Name');
            }
            console.log('Valid !!!')

            value['id'] = this.category['id'];
         
            this.addCategory(value);
        }
        console.log(value);
    }

    addCategory(data) {
        this.crudService.update('categories', data)
                        .subscribe( 
                            data => { 
                                this.router.navigate(['/categories/list']) 
                            }
                        ); 
    }
}
