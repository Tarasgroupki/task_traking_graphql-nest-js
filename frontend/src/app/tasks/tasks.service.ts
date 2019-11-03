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
export class TasksService {

    //const API_URL = environment.apiUrl;

    constructor(private apollo: Apollo) {
    }

    public getTasks() {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query tasks { tasks{id, title, description, status, sprint{title}, user{name}, deadline} }`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            }
        }).valueChanges
        .pipe(
            map(result => result.data.tasks)
        );
    }

    getOneTask(id: number) {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query task($id: ID!) {task(id: $id){id, title, description, status, sprint{title}, user{name}, deadline}}`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            },
            variables: {
                id: id
            }
        }).valueChanges
        .pipe(
            map(result => result.data.task)
        );
    }

}
