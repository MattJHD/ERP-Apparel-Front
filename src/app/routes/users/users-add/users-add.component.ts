import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { CrudService } from '../../../core/crud/crud.service';
import { Router } from '@angular/router';

import { SelectComponent } from 'ng2-select/select/select';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss']
})
export class UsersAddComponent implements OnInit {
    // TOASTER
    toaster: any;
    toasterConfig: any;
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        showCloseButton: true
    });

    @ViewChild('SelectShops') public selectShops: SelectComponent;
    @ViewChild('SelectGroups') public selectGroups: SelectComponent;
  
    valForm: FormGroup;

    allRoles = [];
    allShops = [];
    allGroups = [];
    allBrands = [];
    
    private disabled: boolean = false;

    itemsCategories = [];
    validCategories: any[] = [];
    valueCategories: any = {};

    itemsShops = [];
    validShops: any[] = [];
    valueShops: any = {};

    itemsGroups = [];
    validGroups: any[] = [];
    valueGroups: any = {};

    itemsBrands = [];
    validBrands: any[] = [];
    valueBrands: any = {};

    isactive : boolean = false;

    constructor(
        fb: FormBuilder,
        private toasterService: ToasterService,
        private crudService: CrudService,
        private router: Router ) {
            // Model Driven validation
            this.valForm = fb.group({
                'name': [null],
                'firstname': [null],
                'username': [null],
                'email': [null],
                'phone': [null],
                'role': [null],
                'isactive': [],
            });
    }

    ngOnInit() {
        this.getAllRoles();
        this.getAllShops();
        this.getAllGroups();
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }

        //-------

        if (this.valForm.valid) {

            if(value['name'] == null) {
                return this.toasterService.pop('error', 'Name', 'Invalid Name');
            }

            if(value['firstname'] == null) {
                return this.toasterService.pop('error', 'Firstname', 'Invalid Firstname');
            }

            if(value['username'] == null) {
                return this.toasterService.pop('error', 'Username', 'Invalid Username');
            }

            if(value['email'] == null ) {
                return this.toasterService.pop('error', 'Email', 'Invalid Email');
            }

            if(value['phone'] == null ) {
                return this.toasterService.pop('error', 'Phone', 'Invalid Phone');
            }

            if(value['role'] == null) {
                return this.toasterService.pop('error', 'Role', 'Invalid Role');
            }
            
            for (var i=0; i < this.valueShops.length; i++) {
                for (var j=0; j < this.allShops.length; j++) {
                    if(this.valueShops[i]['text'] == this.allShops[j]['name']){
                        this.validShops.push(this.allShops[j]);
                    }
                }
            }
            value['shops'] = this.validShops;
            if(this.validShops.length == 0) {
                return this.toasterService.pop('error', 'Shops', 'Invalid Shops');
            }
            this.validShops = [];
            


            for (var i=0; i < this.valueGroups.length; i++) {
                for (var j=0; j < this.allGroups.length; j++) {
                    if(this.valueGroups[i]['text'] == this.allGroups[j]['name']){
                        this.validGroups.push(this.allGroups[j]);
                    }
                }
            }
            value['groups'] = this.validGroups;
            if(this.validGroups.length == 0) {
                return this.toasterService.pop('error', 'Groups', 'Invalid Groups');
            }
            this.validGroups = [];

            console.log('Valid !!!')

            value['salt'] = '';
            value['password'] = '';
            value['date_creation'] = (new Date().toISOString()).slice(0, 10);
         
            this.addUser(value);
        }
        console.log(value);
    }

    addUser(data) {
        this.crudService.create('users', data)
                        .subscribe( 
                            data => { 
                                this.router.navigate(['/users/list']) 
                            }, 
                            error => { 
                                console.log(JSON.stringify(error.json()))
                            } 
                        ); 
    }

    getAllRoles() {
        this.itemsCategories = [];
        this.crudService.getAll('roles')
                        .subscribe(
                            data => {
                                this.allRoles = data;
                                console.log('/-----------------Roles-------------------/')
                                console.log(this.allRoles);
                            }
                        )
    }

    getAllShops() {
        this.crudService.getAll('shops')
                        .subscribe(
                            data => {
                                this.allShops = data;
                                console.log('/-----------------Shops-------------------/')
                                console.log(this.allShops);
                                this.allShops.forEach(item => {
                                    this.itemsShops.push(item.name);
                                });
                                this.selectShops.items = this.itemsShops;
                            }
                        )
    }

    getAllGroups() {
        this.crudService.getAll('groups')
                        .subscribe(
                            data => {
                                this.allGroups = data;
                                console.log('/-----------------Groups-------------------/')
                                console.log(this.allGroups);
                                this.allGroups.forEach(item => {
                                    this.itemsGroups.push(item.name);
                                });
                                this.selectGroups.items = this.itemsGroups;
                            }
                        )
    }

    public selectedShops(value:any):void {
        console.log('Selected value is: ', value);
    }
    public removedShops(value:any):void {
        console.log('Removed value is: ', value);
    }
    public refreshValueShops(value:any):void {
        this.valueShops = value;
    }

    public selectedGroups(value:any):void {
        console.log('Selected value is: ', value);
    }
    public removedGroups(value:any):void {
        console.log('Removed value is: ', value);
    }
    public refreshValueGroups(value:any):void {
        this.valueGroups = value;
    }
}
