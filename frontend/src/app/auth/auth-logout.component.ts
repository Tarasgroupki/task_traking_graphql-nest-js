import { Component, OnInit } from '@angular/core';
//import { AuthService } from './auth.service';
import { ActivatedRoute,RouterModule, Router } from "@angular/router";
import {Apollo} from 'apollo-angular';


@Component({
    selector: 'app-auth-logout',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthLogoutsComponent {
    title = 'app';
    //auth: object;

    constructor(private route: ActivatedRoute, private router: Router, private apollo: Apollo) {
        localStorage.removeItem('token');
        localStorage.removeItem('LoggedIn');
        //sessionStorage.removeItem('token');
        //this.apollo.getClient().resetStore();
        this.router.navigate(['login']);
       // window.location.reload();
        //this.route.params.subscribe( params => this._auth.logoutAuth(params['id']).subscribe(res => {

      //  }) );
    }


}
