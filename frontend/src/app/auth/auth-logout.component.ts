import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';


@Component({
    selector: 'app-auth-logout',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthLogoutsComponent {
    title = 'app';

    constructor(private route: ActivatedRoute, private router: Router, private apollo: Apollo) {
        localStorage.removeItem('token');
        localStorage.removeItem('LoggedIn');
        this.router.navigate(['login']);
    }


}
