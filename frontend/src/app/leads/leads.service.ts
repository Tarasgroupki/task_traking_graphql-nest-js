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
export class LeadsService {

    //const API_URL = environment.apiUrl;

    constructor(private apollo: Apollo) {
    }

    public getClients() {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query clients { clients { id
                    name}}`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            }
        }).valueChanges
        .pipe(
            map(result => result.data.clients)
        );
    }

    public getLeads() {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query leads { leads{id, title, description, status, client{name}, user{name}, contact_date} }`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            }
        }).valueChanges
        .pipe(
            map(result => result.data.leads)
        );
    }

    getOneLead(id: number) {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query lead($id: ID!) {lead(id: $id){id, title, description, status, client{id, name}, user{id, name}, contact_date}}`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            },
            variables: {
                id: id
            }
        }).valueChanges
        .pipe(
            map(result => result.data.lead)
        );
    }

    createLead(lead: any) {
        console.log(lead);
        return this.apollo.mutate({
            mutation: gql`
                mutation createLead($title: String!, $description: String!, $status: Int!, $user_assigned: Int!, $client: Int!, $user_created: Int!, $contact_date: Date)
                {createLead(lead: {title: $title, description: $description, status: $status, user_assigned: $user_assigned, client: $client, user_created: $user_created, contact_date: $contact_date}){
                    id,
                    title,
                    description,
                    status,
                    user_assigned
                }
                }`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            },
            variables: {
                title: lead.title,
                description: lead.description,
                status: lead.status,
                user_assigned: parseInt(lead.user_assigned),
                client: parseInt(lead.client),
                user_created: 1,
                contact_date: lead.contact_date
            }
        });
    }

    updateLead(id: number, lead: any) {
        console.log(id, lead);
        lead.user_assigned = parseInt(lead.user);
        lead.client = parseInt(lead.client);
        return this.apollo.mutate({
            mutation: gql`
                mutation updateLead($id: Int!, $title: String!, $description: String!, $status: Int!, $user_assigned: Int!, $client: Int!, $user_created: Int!, $contact_date: Date)
                {updateLead(lead: {id: $id, title: $title, description: $description, status: $status, user_assigned: $user_assigned, client: $client, user_created: $user_created, contact_date: $contact_date}){
                    id,
                    title,
                    description,
                    status,
                    user_assigned,
                    user{id},
                    contact_date
                }
                }`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            },
            variables: {
                id: id,
                title: lead.title,
                description: lead.description,
                status: lead.status,
                user_assigned: lead.user_assigned,
                client: lead.client,
                user_created: 1,
                contact_date: lead.contact_date
            }
        });
    }

    deleteLead(id: number) {
        return this.apollo.mutate({
            mutation: gql`
                mutation deleteLead($id: ID!) {
                    deleteLead(id: $id)
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

    deleteLeads(id_arr: any) {
        console.log(id_arr);
        return this.apollo.mutate( {
            mutation: gql`
                mutation deleteLeads($id_arr:[Int]) {
                    deleteLeads(arr_id:$id_arr)
                }
            `,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            },
            variables: {
                id_arr: id_arr
            }
        });
    }

    callLead() {
        return this.apollo.subscribe({
            query: gql`
                subscription notificationAdded {notificationAdded{id, title}}  
            `,
        }).pipe(
            map(result => result.data)
        );
    }

}
