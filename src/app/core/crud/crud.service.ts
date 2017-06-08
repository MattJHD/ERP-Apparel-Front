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
        return this.http.get(this.url + entity + '/' + id)
                        .map((response: Response) => response.json());
    }

    getAll(entity) {
        return this.http.get(this.url + entity)
                        .map((response: Response) => response.json());
    }

    create(entity, data) {
        return this.http.post(this.url + entity, data)
                        .map((response: Response) => response.json());
    }

    update(entity, data) {
        return this.http.put(this.url + entity + '/' + data.id, data)
                        .map((response: Response) => response.json());
    }
}