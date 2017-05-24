import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { CrudService } from '../../../core/crud/crud.service';
import { Router } from '@angular/router';

import { SelectComponent } from 'ng2-select/select/select';

@Component({
  selector: 'app-articles-add',
  templateUrl: './articles-add.component.html',
  styleUrls: ['./articles-add.component.scss']
})
export class ArticlesAddComponent implements OnInit {
    // TOASTER
    toaster: any;
    toasterConfig: any;
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        showCloseButton: true
    });

    @ViewChild('SelectCategories') public selectCategories: SelectComponent;
    @ViewChild('SelectMaterials') public selectMaterials: SelectComponent;
    @ViewChild('SelectColors') public selectColors: SelectComponent;
    @ViewChild('SelectBrands') public selectBrands: SelectComponent;
  
    valForm: FormGroup;

    allCategories = [];
    allMaterials = [];
    allColors = [];
    allBrands = [];
    allShops = [];
    
    private disabled: boolean = false;

    itemsCategories = [];
    validCategories: any[] = [];
    valueCategories: any = {};

    itemsMaterials = [];
    validMaterials: any[] = [];
    valueMaterials: any = {};

    itemsColors = [];
    validColors: any[] = [];
    valueColors: any = {};

    itemsBrands = [];
    validBrands: any[] = [];
    valueBrands: any = {};

    constructor(
        fb: FormBuilder,
        private toasterService: ToasterService,
        private crudService: CrudService,
        private router: Router ) {
            // Model Driven validation
            this.valForm = fb.group({
                'name': [null],
                'price': [null],
                'size': [null],
                'shop': [null],
                'brand': [null],
                'category': [null]
            });
    }

    ngOnInit() {
        this.getAllCategories();
        this.getAllMaterials();
        this.getAllColors();
        this.getAllBrands();
        this.getAllShops();
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

            if(value['price'] == null) {
                return this.toasterService.pop('error', 'Price', 'Invalid Price');
            }

            if(value['size'] == null) {
                return this.toasterService.pop('error', 'Price', 'Invalid Size');
            }

            

            for (var i=0; i < this.valueMaterials.length; i++) {
                for (var j=0; j < this.allMaterials.length; j++) {
                    if(this.valueMaterials[i]['text'] == this.allMaterials[j]['name']){
                        this.validMaterials.push(this.allMaterials[j]);
                    }
                }
            }
            value['materials'] = this.validMaterials;
            if(this.validMaterials.length == 0) {
                return this.toasterService.pop('error', 'Materials', 'Invalid Materials');
            }
            this.validMaterials = [];
            


            for (var i=0; i < this.valueColors.length; i++) {
                for (var j=0; j < this.allColors.length; j++) {
                    if(this.valueColors[i]['text'] == this.allColors[j]['name']){
                        this.validColors.push(this.allColors[j]);
                    }
                }
            }
            value['colors'] = this.validColors;
            if(this.validColors.length == 0) {
                return this.toasterService.pop('error', 'Colors', 'Invalid Colors');
            }
            this.validColors = [];


            if(value['shop'] == null ) {
                return this.toasterService.pop('error', 'Shop', 'Invalid Shop');
            }

            if(value['brand'] == null ) {
                return this.toasterService.pop('error', 'Brand', 'Invalid Brand');
            }

            if(value['category'] == null ) {
                return this.toasterService.pop('error', 'Category', 'Invalid Category');
            }

            console.log('Valid !!!')
         
            this.addArticle(value);
        }
        console.log(value);
    }

    addArticle(data) {
        this.crudService.create('articles', data)
                        .subscribe( 
                            data => { 
                                this.router.navigate(['/articles/list']) 
                            }, 
                            error => { 
                                console.log(JSON.stringify(error.json()))
                            } 
                        ); 
    }

    getAllCategories() {
        this.itemsCategories = [];
        this.crudService.getAll('categories')
                        .subscribe(
                            data => {
                                this.allCategories = data;
                                console.log('/-----------------Categories-------------------/')
                                console.log(this.allCategories);
                            }
                        )
    }

    getAllMaterials() {
        this.crudService.getAll('materials')
                        .subscribe(
                            data => {
                                this.allMaterials = data;
                                console.log('/-----------------Materials-------------------/')
                                console.log(this.allMaterials);
                                this.allMaterials.forEach(item => {
                                    this.itemsMaterials.push(item.name);
                                });
                                this.selectMaterials.items = this.itemsMaterials;
                            }
                        )
    }

    getAllColors() {
        this.crudService.getAll('colors')
                        .subscribe(
                            data => {
                                this.allColors = data;
                                console.log('/-----------------Colors-------------------/')
                                console.log(this.allColors);
                                this.allColors.forEach(item => {
                                    this.itemsColors.push(item.name);
                                });
                                this.selectColors.items = this.itemsColors;
                            }
                        )
    }

    getAllBrands() {
        this.crudService.getAll('brands')
                        .subscribe(
                            data => {
                                this.allBrands = data;
                                console.log('/-----------------Brands-------------------/')
                            }
                        )
    }

    getAllShops() {
        this.crudService.getAll('shops')
                        .subscribe(
                            data => {
                                this.allShops = data;
                                console.log(this.allShops);
                            }
                        )
    }


    public selectedMaterials(value:any):void {
        console.log('Selected value is: ', value);
    }
    public removedMaterials(value:any):void {
        console.log('Removed value is: ', value);
    }
    public refreshValueMaterials(value:any):void {
        this.valueMaterials = value;
    }

    public selectedColors(value:any):void {
        console.log('Selected value is: ', value);
    }
    public removedColors(value:any):void {
        console.log('Removed value is: ', value);
    }
    public refreshValueColors(value:any):void {
        this.valueColors = value;
    }
}
