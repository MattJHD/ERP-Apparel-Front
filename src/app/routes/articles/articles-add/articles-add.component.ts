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
                'shops': [null]
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

            for (var i=0; i < this.valueCategories.length; i++) {
                for (var j=0; j < this.allCategories.length; j++) {
                    if(this.valueCategories[i]['text'] == this.allCategories[j]['name']){
                        this.validCategories.push({id: this.allCategories[j].id});
                    }
                }
            }
            value['categories'] = this.validCategories;
            if(this.validCategories.length == 0) {
                return this.toasterService.pop('error', 'Categories', 'Invalid Categories');
            }
            this.validCategories = [];

            

            for (var i=0; i < this.valueMaterials.length; i++) {
                for (var j=0; j < this.allMaterials.length; j++) {
                    if(this.valueMaterials[i]['text'] == this.allMaterials[j]['name']){
                        this.validMaterials.push({id: this.allMaterials[j].id});
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
                        this.validColors.push({id: this.allColors[j].id});
                    }
                }
            }
            value['colors'] = this.validColors;
            if(this.validColors.length == 0) {
                return this.toasterService.pop('error', 'Colors', 'Invalid Colors');
            }
            this.validColors = [];
            


            for (var i=0; i < this.valueBrands.length; i++) {
                for (var j=0; j < this.allBrands.length; j++) {
                    if(this.valueBrands[i]['text'] == this.allBrands[j]['name']){
                        this.validBrands.push({id: this.allBrands[j].id});
                    }
                }
            }
            value['brands'] = this.validBrands;
            if(this.validBrands.length == 0) {
                return this.toasterService.pop('error', 'Brands', 'Invalid Brands');
            }
            this.validBrands = [];


            if(value['shops'] == null ) {
                return this.toasterService.pop('error', 'Shops', 'Invalid Shops');
            }

            var shop = [];
            shop.push(value['shops']);
            value['shops'] = shop;

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
                                this.allCategories.forEach(item => {
                                    this.itemsCategories.push(item.name);
                                });
                                this.selectCategories.items = this.itemsCategories;
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
                                console.log(this.allBrands);
                                this.allBrands.forEach(item => {
                                    this.itemsBrands.push(item.name);
                                });
                                this.selectBrands.items = this.itemsBrands;
                            }
                        )
    }

    getAllShops() {
        this.crudService.getAll('shops')
                        .subscribe(
                            data => {
                                this.allShops = data;
                                console.log('/-----------------Brands-------------------/')
                                console.log(this.allShops);
                            }
                        )
    }


    public selectedCategories(value:any):void {
        console.log('Selected value is: ', value);
    }
    public removedCategories(value:any):void {
        console.log('Removed value is: ', value);
    }
    public refreshValueCategories(value:any):void {
        this.valueCategories = value;
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

    public selectedBrands(value:any):void {
        console.log('Selected value is: ', value);
    }
    public removedBrands(value:any):void {
        console.log('Removed value is: ', value);
    }
    public refreshValueBrands(value:any):void {
        this.valueBrands = value;
    }
}
