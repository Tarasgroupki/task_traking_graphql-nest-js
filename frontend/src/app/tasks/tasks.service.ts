import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import {Query} from '../types';
import gql from 'graphql-tag';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class TasksService {

    constructor(private apollo: Apollo) {
    }

    public getTasks() {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query tasks { tasks{id, title, description, status, sprint{title}, user{name}, deadline} }`,
            context: {
              headers: new HttpHeaders().set('Authorization', 'Bearer ' +  localStorage.getItem('token')),
            }
        }).valueChanges
        .pipe(
            map(result => result.data.tasks)
        );
    }

    public getOneTask(id: number) {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query task($id: ID!) {task(id: $id){id, title, description, status, sprint{title}, user{name}, deadline}}`,
            variables: {
                id
            },
            context: {
              headers: new HttpHeaders().set('Authorization', 'Bearer ' +  localStorage.getItem('token')),
            }
        }).valueChanges
        .pipe(
            map(result => result.data.task)
        );
    }

}
