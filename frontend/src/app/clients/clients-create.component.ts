import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from "apollo-angular";
//import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from '@angular/forms';
import { Client } from './clients.model';
import { Users } from './users.model';

import gql from 'graphql-tag';
import {User, Query} from "../types";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Subscription} from 'rxjs';
import {HttpHeaders} from "@angular/common/http";
import {ClientsService} from './clients.service';

//import { Client, Query } from "../types";

@Component({
  selector: 'app-clients-create',
  templateUrl: './clients-create.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsCreateComponent implements OnInit, OnDestroy
{
   // log(x) { console.log(x); }
    ///client: any = 1;
    client: any = new Client('', '', '', '', '', '', '', '', '', '', '', 1);
    client_obj: Client[] = [];
    user: any = new Users('','');
    users = [];

    public sub: Subscription;

    constructor(private formBuilder: FormBuilder, private clientService: ClientsService) {

    }

    addClient() {
        this.client_obj.push(new Client(this.client.name, this.client.email, this.client.primary_number, this.client.secondary_number, this.client.address, this.client.zipcode, this.client.city, this.client.company_name, this.client.vat, this.client.company_type, this.client.user_id, this.client.industry));
        console.log(this.client_obj);
        this.clientService.createClient(this.client_obj[0]).subscribe(res => res);
    }
    ngOnInit() {
       this.sub = this.clientService.getUsers()
        .subscribe(res => {
            for (let i = 0; i < Object.keys(res).length; i++) {
                this.user = new Users(res[i].id.toString(), res[i].name);
                this.users.push(this.user);
            }
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
