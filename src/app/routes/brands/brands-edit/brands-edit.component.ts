import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { CrudService } from '../../../core/crud/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

import { SelectComponent } from 'ng2-select/select/select';

@Component({
  selector: 'app-brands-edit',
  templateUrl: './brands-edit.component.html',
  styleUrls: ['./brands-edit.component.scss']
})
export class BrandsEditComponent implements OnInit {

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

    brand = {};

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
            this.getBrand(this.id);
        });
    }

    getBrand(id) {
        this.crudService.getById('brands', id)
                        .subscribe(
                            data => {
                                this.brand = data;
                                console.log(this.brand)
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

            value['id'] = this.brand['id'];
         
            this.addBrand(value);
        }
        console.log(value);
    }

    addBrand(data) {
        this.crudService.update('brands', data)
                        .subscribe( 
                            data => { 
                                this.router.navigate(['/brands/list']) 
                            }
                        ); 
    }
}
