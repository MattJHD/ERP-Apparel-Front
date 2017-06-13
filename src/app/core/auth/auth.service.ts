import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Observable, Subject} from 'rxjs/Rx';
import {Headers, RequestOptions} from '@angular/http';
import { Router } from '@angular/router';
import { GlobalsService } from '../globals/globals.service';
import { tokenNotExpired } from 'angular2-jwt';
 
@Injectable()
export class AuthService {

    constructor(private http: Http, private globalsService: GlobalsService,private router: Router) {}

    private url = this.globalsService.BACK_URL;

    // Observable string sources
    private onlogin = new Subject<any>();  

    // Observable string streams
    onlogin$ = this.onlogin.asObservable();

    login(username) {
            return this.http.get(this.url + 'users/username='+username, {
                headers: new Headers()
            })
                            .map((response: Response) => {
                                // login successful if there's a jwt token in the response
                                let user = response.json();
                                if (user) {
                                    console.log(user);
                                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                                    localStorage.setItem('apparelUser', JSON.stringify(user));
                                    this.onlogin.next(user);
                                }
                            });
    }
/*
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('apparelUser');
        this.router.navigate(['/login']);
    }
*/
    authenticate(user: any) {
  	let url 	=  this.url + 'api/login_check';
        let body 	= new URLSearchParams();
        body.append('username', user.username);
        body.append('password', user.password);
  	let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers: headers});
 
  	return this.http
  	        .post(url, body.toString(), options)
  		.map((data: Response) => data.json());
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('apparelUser');
        this.router.navigate(['/login']) 
    }

    loggedIn() {
        return tokenNotExpired();
    }
    /*
        resetPassword(data) {
                this.http.post('http://localhost:1337/password-reset', data, {
                    headers: new Headers() 
                })
                .map(res => res.json())
                .catch(this.handleError);
        }
    */
 
}