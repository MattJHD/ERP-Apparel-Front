import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../core/crud/crud.service';

@Component({
    selector: 'app-role-list',
    templateUrl: './roles-list.component.html',
    styleUrls: ['./roles-list.component.scss']
})

export class RolesListComponent implements OnInit {

    errorMessage: string;
    roles: any[] = [];

    constructor(private crudService: CrudService) { }

    ngOnInit() {  
        this.getRoles();
    }

    getRoles(){
           this.crudService.getAll('roles')
                                .subscribe(
                                    roles => {
                                        this.roles = roles;
                                        console.log(this.roles);
                                    },
                                    error => this.errorMessage = <any>error
                                );
    }
}
