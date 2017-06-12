import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../../core/crud/crud.service';

@Component({
    selector: 'app-roles-edit',
    templateUrl: './roles-edit.component.html',
    styleUrls: ['./roles-edit.component.scss']
})
export class RolesEditComponent implements OnInit {

    entity: string = 'role';
    subEntity: string = 'permission';

    id: number;
    private sub: any;

    errorMessage: string;
    role: any[] = [];
    allPerms: any[] = [];
    rolePerm: any[] = [];
    perms: any[] = [];

    constructor(private route: ActivatedRoute, private crudService: CrudService, private router: Router) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
            // In a real app: dispatch action to load the details here.
            this.getRole(this.id);
        });
    }

    getRole(id) {
        this.crudService.getById('roles', this.id)
                        .subscribe(
                            role => { 
                                this.role = role;
                                this.getAllPerm();
                         },
                            error => this.errorMessage = <any>error
                        );
    }

    getAllPerm() {
        this.crudService.getAll('permissions')
                        .subscribe(
                            allPerms => {
                                this.allPerms = allPerms;
                                this.rolePerm = this.role['permissions'];

                                console.log('/***********************');
                                console.log(this.rolePerm);
                                console.log(this.allPerms);
                                console.log('/***********************');

                                for (var i = 0; i < this.allPerms.length; i++) {
                                    for (var j = 0; j < this.rolePerm.length; j++) {
                                        if(JSON.stringify(this.rolePerm[j].id) === JSON.stringify(this.allPerms[i].id)){
                                            this.allPerms[i].checked = true
                                        }
                                    }
                                }
                            },
                            error => this.errorMessage = <any>error
                        );
    }

    saveRole(data: any) {

        for (var i = 1; i <= this.allPerms.length; i++) {
            if(data[i] == true){
                var copy = Object.assign({}, this.allPerms[i-1]);            
                this.perms.push(copy)
            }
        }

        for (var j = 0; j < this.allPerms.length + 1; j++) {
            delete data[j]
        }

        data['permissions'] = this.perms;
        data['id'] = this.role['id'];
        data['libelle'] = this.role['libelle'];
        data['isactive'] = this.role['isactive'];
        console.log(data);

        this.crudService.update('roles', data)
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
