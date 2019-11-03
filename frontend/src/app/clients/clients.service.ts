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
export class ClientsService {

    //const API_URL = environment.apiUrl;

    constructor(private apollo: Apollo) {
    }

   public getUsers() {
        return this.apollo.watchQuery<Query>({
            query: gql`
                query users { users { id
                    name}}`
        }).valueChanges
        .pipe(
            map(result => result.data.users)
        );
   }

   public getClients() {
       return this.apollo.watchQuery<Query>({
            query: gql`
                query clients { clients { id
                    name
                    email
                    primary_number
                    secondary_number
                    address
                    zipcode
                    city
                    company_name
                    industry
                    user{id} }}`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            }
        }).valueChanges
        .pipe(
            map(result => result.data.clients)
        );
    }

    getOneCLient(id: number) {
       return this.apollo.watchQuery<Query>({
            query: gql`
                query client($id: ID!){client(id: $id) {
                    id
                    name
                    email
                    primary_number
                    secondary_number
                    address
                    zipcode
                    city
                    company_name,
                    industry,
                    user{id}}}`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            },
            variables: {
                id: id
            }
        }).valueChanges
        .pipe(
            map(result => result.data.client)
        );
    }

    createClient(client: any) {
       return this.apollo.mutate({
            mutation: gql`
                mutation createClient($name: String!, $email: String!, $primary_number: String!, $secondary_number: String!, $address: String!, $zipcode: String!, $city: String!, $company_name: String!, $vat: String!, $company_type: String!, $user_id: Int)
                {createClient(client: {name: $name, email: $email, primary_number: $primary_number, secondary_number: $secondary_number, address: $address, zipcode: $zipcode, city: $city, company_name: $company_name, vat: $vat, company_type: $company_type, user: $user_id}){
                    id,
                    name,
                    email,
                    primary_number,
                    secondary_number,
                    address,
                    zipcode,
                    city,
                    company_name,
                    vat,
                    company_type,
                    user{id}
                }
                }`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            },
            variables: {
                name: client.name,
                email: client.email,
                primary_number: client.primary_number,
                secondary_number: client.secondary_number,
                address: client.address,
                zipcode: client.zipcode,
                city: client.city,
                company_name: client.company_name,
                vat: client.vat,
                company_type: client.company_type,
                industry: 1,
                user_id: +client.user
            }
        });
    }

    updateClient(id: number, client: any) {
       return this.apollo.mutate({
            mutation: gql`
            mutation updateClient($id: Int!, $name: String!, $email: String!, $primary_number: String!, $secondary_number: String!, $address: String!, $zipcode: String!, $city: String!, $company_name: String!, $vat: String!, $company_type: String!, $user_id: Int!)
            {updateClient(client: {id: $id, name: $name, email: $email, primary_number: $primary_number, secondary_number: $secondary_number, address: $address, zipcode: $zipcode, city: $city, company_name: $company_name, vat: $vat, company_type: $company_type, user: $user_id}){
                id,
                name,
                email,
                primary_number,
                secondary_number,
                address,
                zipcode,
                city,
                company_name,
                vat,
                company_type,
                user{id}
            }
            }`,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            },
            variables: {
                id: id,
                name: client.name,
                email: client.email,
                primary_number: client.primary_number,
                secondary_number: client.secondary_number,
                address: client.address,
                zipcode: client.zipcode,
                city: client.city,
                company_name: client.company_name,
                vat: client.vat,
                company_type: client.company_type,
                industry: 1,
                user_id: 1
            }
        });
    }

    deleteClient(id: number) {
       return this.apollo.mutate({
            mutation: gql`
                mutation deleteClient($id: ID!) {
                    deleteClient(id: $id)
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

    deleteClients(id_arr: any) {
        return this.apollo.mutate( {
           mutation: gql`
               mutation deleteClients($id_arr: [Int]){deleteClients(arr_id: $id_arr)}
           `,
            context: {
                headers: new HttpHeaders().set("Authorization", "Bearer " +  localStorage.getItem('token')),
            },
            variables: {
                id_arr: id_arr
            }
        });
    }


}
