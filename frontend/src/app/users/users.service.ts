import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import {Query} from '../types';
import gql from 'graphql-tag';

@Injectable()
export class UsersService {

    constructor(private apollo: Apollo) {
    }

    public getUsers() {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query users { users{id, name, email, address, work_number, personal_number}}`,
        }).valueChanges
        .pipe(
            map(result => result.data.users)
        );
    }

    getOneUser(id: number) {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query user($id: ID!) { user(id: $id){id, name, email, address, work_number, personal_number}}`,
            variables: {
                id
            }
        }).valueChanges
        .pipe(
            map(result => result.data.user)
        );
    }

}
