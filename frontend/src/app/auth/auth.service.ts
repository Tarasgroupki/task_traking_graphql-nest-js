import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import 'rxjs/add/operator/map';
//import {map} from "rxjs/operators";
import {BehaviorSubject} from 'rxjs';
import {User} from '../types';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
//import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

    //const API_URL = environment.apiUrl;

  currentUser = new BehaviorSubject<User|null>(null);
  permissions = new BehaviorSubject(null);
  //showFiller = new BehaviorSubject<boolean | null>(null);

  constructor(private apollo: Apollo) { }

    getAuth(auth: any) {
        return this.apollo.mutate({
          mutation: gql`
            mutation UserLogin($email: String!, $password: String!) { login(auth:{email: $email, password: $password}) {user{id, email, address, work_number, personal_number, image_path}, token, roles, permissions}}`,
          variables: {
            email: auth[0],
            password: auth[1],
          }
        });
    }

    public isAuthenticated(): boolean {
         const token = localStorage.getItem('token');

         if (token) {
           return true;
         }

         return false;
    }
  /*  logoutAuth(id: number) {
       return this._http.get('http://task-treking/public/api/users/logout/'+id+'').pipe(
           map(result => result)
       );
    }*/

}
