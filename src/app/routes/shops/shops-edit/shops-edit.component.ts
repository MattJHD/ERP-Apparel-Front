import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { CrudService } from '../../../core/crud/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

import { SelectComponent } from 'ng2-select/select/select';

@Component({
  selector: 'app-shops-edit',
  templateUrl: './shops-edit.component.html',
  styleUrls: ['./shops-edit.component.scss']
})
export class ShopsEditComponent implements OnInit {

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

    shop = {};

    constructor(
        private route: ActivatedRoute, 
        fb: FormBuilder,
        private toasterService: ToasterService,
        private crudService: CrudService,
        private router: Router ) {
            // Model Driven validation
            this.valForm = fb.group({
                'name': [null],
                'localisation': [null]
            });
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.getShop(this.id);
        });
    }

    getShop(id) {
        this.crudService.getById('shops', id)
                        .subscribe(
                            data => {
                                this.shop = data;
                                console.log(this.shop)
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

            if(value['localisation'] == null) {
                return this.toasterService.pop('error', 'Localisation', 'Invalid Localisation');
            }

            console.log('Valid !!!')

            value['id'] = this.shop['id'];
         
            this.addShop(value);
        }
        console.log(value);
    }

    addShop(data) {
        this.crudService.update('shops', data)
                        .subscribe( 
                            data => { 
                                this.router.navigate(['/shops/list']) 
                            }
                        ); 
    }
}
