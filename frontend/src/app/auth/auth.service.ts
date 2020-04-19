import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {User} from '../types';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';

@Injectable()
export class AuthService {

  currentUser = new BehaviorSubject<User|null>(null);
  permissions = new BehaviorSubject(null);
  token = new BehaviorSubject<null>(null);

  constructor(private apollo: Apollo) { }

    public getAuth(auth: any) {
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

         return !!token;
    }

}
