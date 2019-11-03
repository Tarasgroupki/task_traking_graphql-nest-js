import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from "apollo-angular";
//import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from '@angular/forms';
import { Lead } from './leads.model';
import { Client } from './client.model';
import { Users } from '../clients/users.model';

import gql from 'graphql-tag';
import {User, Query} from "../types";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Subscription} from 'rxjs';
import {HttpHeaders} from "@angular/common/http";
import {LeadsService} from './leads.service';
import {ClientsService} from '../clients/clients.service';

//import { Client, Query } from "../types";

@Component({
    selector: 'app-leads-create',
    templateUrl: './leads-create.component.html',
    styleUrls: ['./leads.component.css']
})
export class LeadsCreateComponent implements OnInit, OnDestroy
{
    // log(x) { console.log(x); }
    ///client: any = 1;
    lead: any = new Lead('', '', 1, '', '', (new Date()));
    lead_object: Lead[] = [];
    user: any = new Users('','');
    client: any = new Client('','');
    users = [];
    clients = [];
    statuses = [
        {value: 1, viewValue: 'Виконується'},
        {value: 2, viewValue: 'Виконано'},
        {value: 3, viewValue: 'Не виконується'}
    ];

    public sub: Subscription;

    constructor(private formBuilder: FormBuilder, private leadService: LeadsService, private clientService: ClientsService) {

    }

    addLead() {
        this.lead_object.push(new Lead(this.lead.title, this.lead.description, this.lead.status, this.lead.client, this.lead.user_created, this.lead.contact_date));
        console.log(this.lead_object);
        this.leadService.createLead(this.lead_object[0]).subscribe(res => res);
    }
    ngOnInit() {
        this.sub = this.clientService.getUsers()
            .subscribe(res => {
                for (let i = 0; i < Object.keys(res).length; i++) {
                    this.user = new Users(res[i].id.toString(), res[i].name);
                    this.users.push(this.user);
                }
            });
        this.leadService.getClients()
            .subscribe( res => {
                for (let i = 0; i < Object.keys(res).length; i++) {
                    this.client = new Client(res[i].id.toString(), res[i].name);
                    this.clients.push(this.client);
                }
            });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
