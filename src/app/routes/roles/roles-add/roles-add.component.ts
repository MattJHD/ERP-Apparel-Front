import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../../core/crud/crud.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

@Component({
    selector: 'app-roles-add',
    templateUrl: './roles-add.component.html',
    styleUrls: ['./roles-add.component.scss']
})
export class RolesAddComponent implements OnInit {

    valForm: FormGroup;
    id: number;
    private sub: any;

    errorMessage: string;
    allPerms: any[] = [];
    perms: any[] = [];
    permsCheck: any[] = [];

    name;

    constructor(
        private route: ActivatedRoute, 
        private crudService: CrudService, 
        private toasterService: ToasterService,
        private router: Router, 
        fb: FormBuilder
    ) {this.valForm = fb.group({
            'libelle': [null, Validators.required]
        });}

    ngOnInit() {
        this.getAllPerm()
    }

    onChangePerms(data){
        if(data.checked){
            var copy = Object.assign({}, data);            
            this.permsCheck.push(copy)
        }
        else {
            this.searchPerms(data.id)
        }
            console.log(this.permsCheck)
    }

    searchPerms(id){
        for (var i=0; i < this.permsCheck.length; i++) {
            if (this.permsCheck[i].id === id) {
                this.permsCheck.splice(i, 1)
            }
        }
    }

    getAllPerm() {
        this.crudService.getAll('permissions')
                        .subscribe(
                            allPerms => {
                                this.allPerms = allPerms;
                            },
                            error => this.errorMessage = <any>error
                        );
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }

        if (this.valForm.valid) {

            var perms = [];
            value['permissions'] = [];
            for(var i = 0; i < this.permsCheck.length; i++){
                for(var j = 0; j < this.allPerms.length; j++){
                    if(this.permsCheck[i].id == this.allPerms[j].id) {
                        var copy = Object.assign({}, this.allPerms[j]);            
                        perms.push(copy)
                    }
                }
            }
            value['permissions'] = perms;
            if(perms.length == 0) {
                return this.toasterService.pop('error', 'Permission', 'Veuillez saisir une/des Permission(s)');
            }

            value['isactive'] = true;

            this.addRole(value);
        }
    }

    addRole(data: any) {
        this.crudService.create('roles', data)
                        .subscribe( 
                            data => {
                                this.router.navigate(['/roles/list']);
                            }, 
                            error => { 
                                console.log(JSON.stringify(error.json())) 
                            } 
                        ); 
    }
}
