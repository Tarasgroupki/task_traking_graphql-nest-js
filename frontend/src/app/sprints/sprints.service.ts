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
export class SprintsService {

    //const API_URL = environment.apiUrl;

    constructor(private apollo: Apollo) {
    }

    public getSprints() {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query sprints {sprints{id, title, description, status, lead{title}, user{name}, deadline}}
            `,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            }
        }).valueChanges
        .pipe(
            map(result => result.data.sprints)
        );
    }

    getOneSprint(id: number) {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query lead($id: ID!) {sprint(id: $id){id, title, description, status, lead{title}, user{name}, deadline}}`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            },
            variables: {
                id: id
            }
        }).valueChanges
        .pipe(
            map(result => result.data.sprint)
        );
    }

}
