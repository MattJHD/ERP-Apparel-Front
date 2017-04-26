import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalsService } from '../globals/globals.service';
 
@Injectable()
export class CrudService {

    

    constructor(
        private http: Http, 
        private globalsService: GlobalsService
    ) {
    }

    private url = this.globalsService.BACK_URL;

    getById(entity, id) {
        return this.http.get(this.url + entity +'/' + id)
                        .map((response: Response) => response.json());
    }

    getAll(entity, param = null) {
        return this.http.post(this.url + entity + '/all', param)
                        .map((response: Response) => response.json());
    }

    create(entity, data) {
        return this.http.post(this.url + entity + '/add', data)
                        .map((response: Response) => response.json());
    }

    update(entity, data) {
        return this.http.put(this.url + entity +'/update' + data.id, data)
                        .map((response: Response) => response.json());
    }

    getTest(entity, param = null) {
        return this.http.post(this.url + entity + '/test', param)
                        .map((response: Response) => response.json());
    }
}