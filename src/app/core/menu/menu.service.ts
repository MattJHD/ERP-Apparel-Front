import { Injectable } from '@angular/core';
import { AuthService } from "../auth/auth.service";

@Injectable()
export class MenuService {

    menuItems: Array<any>;

    public currUser = JSON.parse(localStorage.getItem('apparelUser'));

    appMenu: any = [];

    constructor(private auth: AuthService) {
        this.menuItems = [];
        
        this.auth.onlogin$.subscribe(
                user => {
                    console.log(user);
                    this.currUser = user;
                    this.menuItems.splice(0, this.menuItems.length);
                this.addMenu(this.appMenu);
        });
    }

    addMenu(items: Array<{
        text: string,
        heading?: boolean,
        link?: string,
        icon?: string,
        alert?: string,
        submenu?: Array<any>
    }>) {
        this.appMenu = items;

        items.forEach((item, index) => {
            var exist = true;
            if(this.currUser) {
                //Properties
                if(item.text == "Properties")
                    exist = this.checkPerm(this.currUser['role']['permissions'], 'manage_settings');
            }
            if(exist) {
                this.menuItems.push(item);
            }
            exist = true;
        });
    }

    getMenu() {
        return this.menuItems;
    }

    checkPerm(arr, val) {
        return arr.some(function(arrVal) {
            return val === arrVal.libelle;
        });
    }

}
