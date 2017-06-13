import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {

    user: any;
    
    currUser = JSON.parse(localStorage.getItem('apparelUser'));

    constructor(private userblockService: UserblockService) {
        this.user = {
            picture: 'assets/img/user/01.png'
        };
    }

    ngOnInit() {
    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }

}
