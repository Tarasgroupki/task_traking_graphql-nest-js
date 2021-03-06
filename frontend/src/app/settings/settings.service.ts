import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import {Query} from '../types';
import gql from 'graphql-tag';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class SettingsService {

    constructor(private apollo: Apollo) {
    }

    public getRoles() {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query roles { roles{id, name}}`,
          context: {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' +  localStorage.getItem('token')),
          }
        }).valueChanges
        .pipe(
            map(result => result.data.roles)
        );
    }

     public getOneRole(id: number) {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query role($id: ID!) { role(id: $id){id, name}}`,
            variables: {
                id
            },
          context: {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' +  localStorage.getItem('token')),
          }
        }).valueChanges
        .pipe(
            map(result => result.data.role)
        );
    }

    public getOnePermission(id: number) {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query role($id: ID!) { role(id: $id){id, name}}`,
            variables: {
                id
            }
        }).valueChanges
        .pipe(
            map(result => result.data.role)
        );
    }

    public getOneRoleHasPermission(id: number) {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query roleHasPermission($role_id: Int!) { roleHasPermission(role_id: $role_id){role_id, permission_id}}`,
            variables: {
                role_id: +id
            }
        }).valueChanges
        .pipe(
            map(result => result.data.roleHasPermission)
        );
    }

    public getRoleByName(name: string) {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query role($name: String) { roleByName(name: $name){name}}`,
            variables: {
                name
            }
        }).valueChanges
        .pipe(
            map(result => result.data.role)
        );
    }

    public getPermissions() {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query permissions { permissions{id, name}}`
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
            variables: {
                name: role.name
            },
          context: {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' +  localStorage.getItem('token')),
          }
        });
    }

}
