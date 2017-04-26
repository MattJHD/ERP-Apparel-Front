import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class GlobalsService {

  constructor() { }

  BACK_URL: string = environment.BACK_URL;
}