import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { CrudService } from '../../../core/crud/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

import { SelectComponent } from 'ng2-select/select/select';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {
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

    allGroups = [];
    allShops = [];
    allRoles = [];
    
    private disabled: boolean = false;

    itemsCategories = [];
    validCategories: any[] = [];
    valueCategories: any = {};

    itemsGroups = [];
    validGroups: any[] = [];
    valueGroups: any = {};

    id: number;
    private sub: any;

    user = {};

    valueShop: any = {};
    initShop: any[] = [];
    itemsShop: string[];
    apiItemsShop: any[];
    validShop: any[] = [];
    changeShop: boolean = false;

    valueGroup: any = {};
    initGroup: any[] = [];
    itemsGroup: string[];
    apiItemsGroup: any[];
    validGroup: any[] = [];
    changeGroup: boolean = false;

    constructor(
        private route: ActivatedRoute, 
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
                                console.log('/-------------------------')
                                console.log(this.user)
                                console.log('/-------------------------')
                                this.getAllGroups();
                                this.getAllShops();
                                this.getAllRoles();
                            }
                        )
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


            var groups = (this.changeGroup) ? this.valueGroup : this.initGroup;

            for (var i=0; i < groups.length; i++) {
                for (var j=0; j < this.apiItemsGroup.length; j++) {
                    if(groups[i]['text'] == this.apiItemsGroup[j].name){
                        this.validGroup.push(this.apiItemsGroup[j]);
                    }
                }
            }
            value['groups'] = this.validGroup;
            if(this.validGroup.length == 0) {
                return this.toasterService.pop('error', 'Groups', 'Invalid Groups');
            }
            this.validGroup = [];
            


            
            var shops = (this.changeShop) ? this.valueShop : this.initShop;

            console.log(shops);

            for (var i=0; i < shops.length; i++) {
                for (var j=0; j < this.apiItemsShop.length; j++) {
                    if(shops[i]['text'] == this.apiItemsShop[j].name){
                        this.validShop.push(this.apiItemsShop[j]);
                    }
                }
            }
            value['shops'] = this.validShop;
            if(this.validShop.length == 0) {
                return this.toasterService.pop('error', 'Shops', 'Invalid Shops');
            }
            this.validShop = [];

            console.log('Valid !!!')

            value['id'] = this.user['id'];
            value['salt'] = '';
            value['password'] = this.user['password'];
            value['date_creation'] = this.user['date_creation'];
         
            this.addArticle(value);
        }
        console.log(value);
    }

    addArticle(data) {
        this.crudService.update('users', data)
                        .subscribe( 
                            data => { 
                                this.router.navigate(['/users/list']) 
                            }, 
                            error => { 
                                console.log(JSON.stringify(error.json()))
                            } 
                        ); 
    }

    getAllGroups() {
        this.itemsGroup = [];
        this.crudService.getAll('groups')
                        .subscribe(
                            data => {
                                this.apiItemsGroup = data;
                                this.apiItemsGroup.forEach(item => {
                                    this.itemsGroup.push(item.name);
                                });
                                let i = 0;
                                this.selectGroups.items = this.itemsGroup;

                                for(var j=0; j<this.apiItemsGroup.length; j++){
                                    for(var k=0; k<this.user['groups'].length; k++){
                                        if(this.apiItemsGroup[j].id == this.user['groups'][k].id){
                                            var group = {
                                                'id': this.apiItemsGroup[j].name,
                                                'text': this.apiItemsGroup[j].name,
                                            }; 
                                            this.initGroup.push(group);
                                        }
                                    }
                                }

                                this.selectGroups.active = this.initGroup;
                            }
                        )
    }

    

    getAllRoles() {
        this.crudService.getAll('roles')
                        .subscribe(
                            data => {
                                this.allRoles = data;
                                for (var i=0; i < this.allRoles.length; i++) {
                                    if(this.user['role'].id == this.allRoles[i].id){
                                        this.user['role'] = this.allRoles[i];
                                    } 
                                 } 
                            }
                        )
    }


    getAllShops() {
        this.itemsShop = [];
        this.crudService.getAll('shops')
                        .subscribe(
                            data => {
                                this.apiItemsShop = data;
                                this.apiItemsShop.forEach(item => {
                                    this.itemsShop.push(item.name);
                                });
                                let i = 0;
                                this.selectShops.items = this.itemsShop;

                                for(var j=0; j<this.apiItemsShop.length; j++){
                                    for(var k=0; k<this.user['shops'].length; k++){
                                        if(this.apiItemsShop[j].id == this.user['shops'][k].id){ 
                                            var shop = {
                                                'id': this.apiItemsShop[j].name,
                                                'text': this.apiItemsShop[j].name,
                                            }; 
                                            this.initShop.push(shop);
                                        }
                                    }
                                }

                                this.selectShops.active = this.initShop;
                            }
                        )
    }
    
    public selectedGroups(value:any):void {
        console.log('Selected value is: ', value);
        this.changeGroup = true;
    }

    public removedGroups(value:any):void {
        console.log('Removed value is: ', value);
        this.changeGroup = true;
    }

    public refreshvalueGroups(value:any):void {
        this.valueGroup = value;
        this.changeGroup = true;
    }

    public selectedShops(value:any):void {
        console.log('Selected value is: ', value);
        this.changeShop = true;
    }

    public removedShops(value:any):void {
        console.log('Removed value is: ', value);
        this.changeShop = true;
    }

    public refreshValueShops(value:any):void {
        this.valueShop = value;
        this.changeShop = true;
    }
}
