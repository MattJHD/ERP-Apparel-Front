import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    valForm: FormGroup;
    alertString;

    constructor(public settings: SettingsService, fb: FormBuilder, private router: Router, private authService: AuthService) {

        this.valForm = fb.group({
            'username': [null, Validators.required],
            'password': [null, Validators.required]
        });

    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            this.authService.authenticate(value)
                            .subscribe(
                                data => {
                                    localStorage.setItem('id_token', data['token']);
                                    console.log(value['username'])
                                    this.authService.login(value['username'])
                                                    .subscribe(
                                                        data => {
                                                            this.router.navigate(['/']);	
                                                        },
                                                    );	
                                },
                            );
        }
    }

    ngOnInit() {
        this.authService.logout();
    }

}
