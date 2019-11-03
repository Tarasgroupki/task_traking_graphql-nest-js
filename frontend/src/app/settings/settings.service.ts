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
export class SettingsService {

    //const API_URL = environment.apiUrl;

    constructor(private apollo: Apollo) {
    }

    public getRoles() {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query roles { roles{id, name}}`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            }
        }).valueChanges
        .pipe(
            map(result => result.data.roles)
        );
    }

    getOneRole(id: number) {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query role($id: ID!) { role(id: $id){id, name}}`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            },
            variables: {
                id: id
            }
        }).valueChanges
        .pipe(
            map(result => result.data.role)
        );
    }

    getOnePermission(id: number) {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query role($id: ID!) { role(id: $id){id, name}}`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            },
            variables: {
                id: id
            }
        }).valueChanges
        .pipe(
            map(result => result.data.role)
        );
    }

    getOneRoleHasPermission(id: number) {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query roleHasPermission($role_id: Int!) { roleHasPermission(role_id: $role_id){role_id, permission_id}}`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            },
            variables: {
                role_id: +id
            }
        }).valueChanges
        .pipe(
            map(result => result.data.roleHasPermission)
        );
    }

    getRoleByName(name: string) {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query role($name: String) { roleByName(name: $name){name}}`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            },
            variables: {
                name: name
            }
        }).valueChanges
        .pipe(
            map(result => result.data.role)
        );
    }

    public getPermissions() {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query permissions { permissions{id, name}}`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            }
        }).valueChanges
        .pipe(
            map(result => result.data.permissions)
        );
    }

    public createRole(role: any) {
        return this.apollo.mutate({
            mutation: gql`
                mutation createRole($name: String)
                {createRole(role: {name: $name}){
                    name
                }
                }`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            },
            variables: {
                name: role.name
            }
        });
    }

}
