import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import {Query} from '../types';
import gql from 'graphql-tag';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class SprintsService {

    constructor(private apollo: Apollo) {
    }

    public getSprints() {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query sprints {sprints{id, title, description, status, lead{title}, user{name}, deadline}}
            `,
            context: {
              headers: new HttpHeaders().set('Authorization', 'Bearer ' +  localStorage.getItem('token')),
            }
        }).valueChanges
        .pipe(
            map(result => result.data.sprints)
        );
    }

    public getOneSprint(id: number) {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query lead($id: ID!) {sprint(id: $id){id, title, description, status, lead{title}, user{name}, deadline}}`,
            variables: {
                id
            },
            context: {
              headers: new HttpHeaders().set('Authorization', 'Bearer ' +  localStorage.getItem('token')),
            }
        }).valueChanges
        .pipe(
            map(result => result.data.sprint)
        );
    }

}
