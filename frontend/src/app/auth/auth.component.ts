import {Component, OnInit, OnDestroy} from '@angular/core';
//import { AuthService } from './auth.service';
import {Apollo} from 'apollo-angular';
import {Auth} from './auth.model';
import {Router} from '@angular/router';
//import {User} from '../users/users.model';
import gql from 'graphql-tag';
import {AuthService} from './auth.service';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
    title = 'app';
    auth: any = new Auth('', '');
    authenticate: Auth[] = [];
    errMessage = '';
    public LogginningData: any;
    isLoggedIn: object;

    //  displayedColumns = ['id', 'name', 'email', 'password', 'address', 'work_number', 'personal_number', 'image_path'];

    constructor(private _router: Router, private apollo: Apollo, private authService: AuthService) {
        if (localStorage.getItem('errMessage')) {
            this.errMessage = 'Неправильний логін, або пароль!';
        }
    }

    ngOnInit() {
        // window.location.reload();
       // if (localStorage.getItem('LoggedIn')) {
        //    this._router.navigate(['clients']);
      //  }
        //  else {
        //      this._router.navigate(['login']);
        //   }
    }

    getAuth() {
        this.authenticate.push(this.auth.email, this.auth.password);
        console.log(this.authenticate[0]);
        this.authService.getAuth(this.authenticate).subscribe(res => {
            const data = res.data as any;
            // if (res.data.hasOwnProperty(login)) {

            console.log('User', data.login.user);
            this.authService.currentUser.next(data.login.user);
            this.authService.permissions.next(data.login.permissions);
            //this.authService.showFiller.next(false);

            localStorage.setItem('LoggedIn', JSON.stringify(data.login));
            localStorage.setItem('token', data.login.token);
            localStorage.removeItem('errMessage');
            this.LogginningData = JSON.parse(localStorage.getItem('LoggedIn'));
            console.log(JSON.parse(localStorage.getItem('LoggedIn')));
            //this._router.navigate(['../clients']);
            //  }
             this._router.navigate(['clients']);
        }, (err) => {
            localStorage.setItem('errMessage', 'true');
            this.authenticate.length = 0;
            this.errMessage = 'Неправильний логін, або пароль!';
           // window.location.reload();
        });
    }

    ngOnDestroy(): void {
        // this.sub.unsubscribe();
    }
}

