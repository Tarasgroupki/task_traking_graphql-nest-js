import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import {Query} from '../types';
import gql from 'graphql-tag';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class UsersService {

    constructor(private apollo: Apollo) {
    }

    public getUsers() {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query users { users{id, name, email, address, work_number, personal_number}}`,
            context: {
              headers: new HttpHeaders().set('Authorization', 'Bearer ' +  localStorage.getItem('token')),
            }
        }).valueChanges
        .pipe(
            map(result => result.data.users)
        );
    }

    public getOneUser(id: number) {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query user($id: ID!) { user(id: $id){id, name, email, address, work_number, personal_number}}`,
            variables: {
                id
            },
            context: {
              headers: new HttpHeaders().set('Authorization', 'Bearer ' +  localStorage.getItem('token')),
            }
        }).valueChanges
        .pipe(
            map(result => result.data.user)
        );
    }

}
