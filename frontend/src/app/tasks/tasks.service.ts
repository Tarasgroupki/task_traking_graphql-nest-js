import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import {Query} from '../types';
import gql from 'graphql-tag';

@Injectable()
export class TasksService {

    constructor(private apollo: Apollo) {
    }

    public getTasks() {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query tasks { tasks{id, title, description, status, sprint{title}, user{name}, deadline} }`,
        }).valueChanges
        .pipe(
            map(result => result.data.tasks)
        );
    }

    getOneTask(id: number) {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query task($id: ID!) {task(id: $id){id, title, description, status, sprint{title}, user{name}, deadline}}`,
            variables: {
                id
            }
        }).valueChanges
        .pipe(
            map(result => result.data.task)
        );
    }

}
