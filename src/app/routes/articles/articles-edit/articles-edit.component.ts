import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { CrudService } from '../../../core/crud/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

import { SelectComponent } from 'ng2-select/select/select';

@Component({
  selector: 'app-articles-edit',
  templateUrl: './articles-edit.component.html',
  styleUrls: ['./articles-edit.component.scss']
})
export class ArticlesEditComponent implements OnInit {
    // TOASTER
    toaster: any;
    toasterConfig: any;
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        showCloseButton: true
    });

    @ViewChild('SelectMaterials') public selectMaterials: SelectComponent;
    @ViewChild('SelectColors') public selectColors: SelectComponent;
  
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

    itemsBrands = [];
    validBrands: any[] = [];
    valueBrands: any = {};

    id: number;
    private sub: any;

    article = {};

    valueColor: any = {};
    initColor: any[] = [];
    itemsColor: string[];
    apiItemsColor: any[];
    validColor: any[] = [];
    changeColor: boolean = false;

    valueMaterial: any = {};
    initMaterial: any[] = [];
    itemsMaterial: string[];
    apiItemsMaterial: any[];
    validMaterial: any[] = [];
    changeMaterial: boolean = false;

    constructor(
        private route: ActivatedRoute, 
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
                'category': [null],
                'on_website': [],
                'quantity': [null]
            });
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.getArticle(this.id);
        });
    }

    getArticle(id) {
        this.crudService.getById('articles', id)
                        .subscribe(
                            data => {
                                this.article = data;
                                console.log('/-------------------------')
                                console.log(this.article)
                                console.log('/-------------------------')
                                this.getAllCategories();
                                this.getAllMaterials();
                                this.getAllColors();
                                this.getAllBrands();
                                this.getAllShops();
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

            if(value['price'] == null) {
                return this.toasterService.pop('error', 'Price', 'Invalid Price');
            }

            if(value['size'] == null) {
                return this.toasterService.pop('error', 'Price', 'Invalid Size');
            }

            


            var materials = (this.changeMaterial) ? this.valueMaterial : this.initMaterial;

            for (var i=0; i < materials.length; i++) {
                for (var j=0; j < this.apiItemsMaterial.length; j++) {
                    if(materials[i]['text'] == this.apiItemsMaterial[j].name){
                        this.validMaterial.push(this.apiItemsMaterial[j]);
                    }
                }
            }
            value['materials'] = this.validMaterial;
            if(this.validMaterial.length == 0) {
                return this.toasterService.pop('error', 'Materiaux', 'Veuillez saisir un/des Materiau/Materiaux');
            }
            this.validMaterial = [];
            


            
            var colors = (this.changeColor) ? this.valueColor : this.initColor;

            console.log(colors);

            for (var i=0; i < colors.length; i++) {
                for (var j=0; j < this.apiItemsColor.length; j++) {
                    if(colors[i]['text'] == this.apiItemsColor[j].name){
                        this.validColor.push(this.apiItemsColor[j]);
                    }
                }
            }
            value['colors'] = this.validColor;
            if(this.validColor.length == 0) {
                return this.toasterService.pop('error', 'Couleur', 'Veuillez saisir une/des Couleur/Couleurs');
            }
            this.validColor = [];


            if(value['shop'] == null ) {
                return this.toasterService.pop('error', 'Shop', 'Invalid Shop');
            }

            if(value['brand'] == null ) {
                return this.toasterService.pop('error', 'Brand', 'Invalid Brand');
            }

            if(value['category'] == null ) {
                return this.toasterService.pop('error', 'Category', 'Invalid Category');
            }

            if(value['quantity'] == null) {
                return this.toasterService.pop('error', 'Quantity', 'Invalid Quantity');
            }

            console.log('Valid !!!')

            value['id'] = this.article['id'];
         
            this.addArticle(value);
        }
        console.log(value);
    }

    addArticle(data) {
        this.crudService.update('articles', data)
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
                                for (var i=0; i < this.allCategories.length; i++) {
                                    if(this.article['category'].id == this.allCategories[i].id){
                                        this.article['category'] = this.allCategories[i];
                                    } 
                                 } 
                            }
                        )
    }

    getAllMaterials() {
        this.itemsMaterial = [];
        this.crudService.getAll('materials')
                        .subscribe(
                            data => {
                                this.apiItemsMaterial = data;
                                this.apiItemsMaterial.forEach(item => {
                                    this.itemsMaterial.push(item.name);
                                });
                                let i = 0;
                                this.selectMaterials.items = this.itemsMaterial;

                                for(var j=0; j<this.apiItemsMaterial.length; j++){
                                    for(var k=0; k<this.article['materials'].length; k++){
                                        if(this.apiItemsMaterial[j].id == this.article['materials'][k].id){
                                            var material = {
                                                'id': this.apiItemsMaterial[j].name,
                                                'text': this.apiItemsMaterial[j].name,
                                            }; 
                                            this.initMaterial.push(material);
                                        }
                                    }
                                }

                                this.selectMaterials.active = this.initMaterial;
                            }
                        )
    }

    getAllColors() {
        this.itemsColor = [];
        this.crudService.getAll('colors')
                        .subscribe(
                            data => {
                                this.apiItemsColor = data;
                                this.apiItemsColor.forEach(item => {
                                    this.itemsColor.push(item.name);
                                });
                                let i = 0;
                                this.selectColors.items = this.itemsColor;

                                for(var j=0; j<this.apiItemsColor.length; j++){
                                    for(var k=0; k<this.article['colors'].length; k++){
                                        if(this.apiItemsColor[j].id == this.article['colors'][k].id){ 
                                            var color = {
                                                'id': this.apiItemsColor[j].name,
                                                'text': this.apiItemsColor[j].name,
                                            }; 
                                            this.initColor.push(color);
                                        }
                                    }
                                }

                                this.selectColors.active = this.initColor;
                            }
                        )
    }

    getAllBrands() {
        this.crudService.getAll('brands')
                        .subscribe(
                            data => {
                                this.allBrands = data;
                                for (var i=0; i < this.allBrands.length; i++) {
                                    if(this.article['brand'].id == this.allBrands[i].id){
                                        this.article['brand'] = this.allBrands[i];
                                    } 
                                 } 
                                console.log('/-----------------Brands-------------------/')
                            }
                        )
    }

    getAllShops() {
        this.crudService.getAll('shops')
                        .subscribe(
                            data => {
                                this.allShops = data;
                                for (var i=0; i < this.allShops.length; i++) {
                                    if(this.article['shop'].id == this.allShops[i].id){
                                        this.article['shop'] = this.allShops[i];
                                    } 
                                 } 
                            }
                        )
    }


    
    public selectedMaterials(value:any):void {
        console.log('Selected value is: ', value);
        this.changeMaterial = true;
    }

    public removedMaterials(value:any):void {
        console.log('Removed value is: ', value);
        this.changeMaterial = true;
    }

    public refreshvalueMaterials(value:any):void {
        this.valueMaterial = value;
        this.changeMaterial = true;
    }

    public selectedColors(value:any):void {
        console.log('Selected value is: ', value);
        this.changeColor = true;
    }

    public removedColors(value:any):void {
        console.log('Removed value is: ', value);
        this.changeColor = true;
    }

    public refreshValueColors(value:any):void {
        this.valueColor = value;
        this.changeColor = true;
    }
}
