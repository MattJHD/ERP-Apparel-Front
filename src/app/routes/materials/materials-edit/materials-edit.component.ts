import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { CrudService } from '../../../core/crud/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

import { SelectComponent } from 'ng2-select/select/select';

@Component({
  selector: 'app-materials-edit',
  templateUrl: './materials-edit.component.html',
  styleUrls: ['./materials-edit.component.scss']
})
export class MaterialsEditComponent implements OnInit {

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

    material = {};

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
            this.getMaterial(this.id);
        });
    }

    getMaterial(id) {
        this.crudService.getById('materials', id)
                        .subscribe(
                            data => {
                                this.material = data;
                                console.log(this.material)
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

            value['id'] = this.material['id'];
         
            this.addArticle(value);
        }
        console.log(value);
    }

    addArticle(data) {
        this.crudService.update('materials', data)
                        .subscribe( 
                            data => { 
                                this.router.navigate(['/materials/list']) 
                            }
                        ); 
    }
}
