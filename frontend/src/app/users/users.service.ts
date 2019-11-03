import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';
import {Query} from '../types';
import gql from 'graphql-tag';

@Injectable()
export class UsersService {

    //const API_URL = environment.apiUrl;

    constructor(private apollo: Apollo) {
    }

    public getUsers() {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query users { users{id, name, email, address, work_number, personal_number}}`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            }
        }).valueChanges
        .pipe(
            map(result => result.data.users)
        );
    }

    getOneUser(id: number) {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query user($id: ID!) { user(id: $id){id, name, email, address, work_number, personal_number}}`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            },
            variables: {
                id: id
            }
        }).valueChanges
        .pipe(
            map(result => result.data.user)
        );
    }

}
