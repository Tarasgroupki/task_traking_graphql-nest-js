import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Apollo } from "apollo-angular";
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from "rxjs/operators";
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';
import {Query} from '../types';
import gql from 'graphql-tag';

@Injectable()
export class NotificationsService {

    //const API_URL = environment.apiUrl;

    show = new BehaviorSubject<boolean>(true);

    constructor(private apollo: Apollo) {
    }

    public getNotifications() {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query notifications { notifications{id, name, description, status}}`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            }
        }).valueChanges
        .pipe(
            map(result => result.data.notifications)
        );
    }

    public getNotificationsByUser(id: number) {
      //  const result.data.notificationsByUserAndStatus:any;
        return this.apollo.watchQuery<Query>({
            query: gql`
                query NotificationsByUserAndStatus($id: Int!) { notificationsByUserAndStatus(userId: $id){id, name, description, status}}`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            },
            variables: {
                id: id
            }
        }).valueChanges
        .pipe(
            map(result => result.data.notificationsByUserAndStatus)
        );
    }

    public getNotHasLead(id: number) {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query AllNotificationHasLead($id: Int!){notificationHasLead(id: $id){id}}
            `,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            },
            variables: {
                id: id
            }
        }).valueChanges
        .pipe(
            map(result => result.data.notificationHasLead)
        );
    }

   public deleteNotification(id: number) {
        console.log(id);
        return this.apollo.mutate({
            mutation: gql`
                mutation deleteNotification($id: ID!) {
                    deleteNotification(id: $id)
                }
            `,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            },
            variables: {
                id: id
            }
        });
    }
}
