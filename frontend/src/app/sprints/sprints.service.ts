import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import {Query} from '../types';
import gql from 'graphql-tag';

@Injectable()
export class SprintsService {

    constructor(private apollo: Apollo) {
    }

    public getSprints() {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query sprints {sprints{id, title, description, status, lead{title}, user{name}, deadline}}
            `
        }).valueChanges
        .pipe(
            map(result => result.data.sprints)
        );
    }

    getOneSprint(id: number) {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query lead($id: ID!) {sprint(id: $id){id, title, description, status, lead{title}, user{name}, deadline}}`,
            variables: {
                id
            }
        }).valueChanges
        .pipe(
            map(result => result.data.sprint)
        );
    }

}
