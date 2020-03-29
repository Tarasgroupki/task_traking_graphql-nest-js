import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Lead } from './leads.model';
import { Client } from './client.model';
import { Users } from '../clients/users.model';
import {Subscription} from 'rxjs';
import {LeadsService} from './leads.service';
import {ClientsService} from '../clients/clients.service';

@Component({
    selector: 'app-leads-create',
    templateUrl: './leads-create.component.html',
    styleUrls: ['./leads.component.css']
})
export class LeadsCreateComponent implements OnInit, OnDestroy {
    lead: any = new Lead('', '', 1, '', '', (new Date()));
    leadObject: Lead[] = [];
    user: any = new Users('', '');
    client: any = new Client('', '');
    users = [];
    clients = [];
    statuses = [
        {value: 1, viewValue: 'Виконується'},
        {value: 2, viewValue: 'Виконано'},
        {value: 3, viewValue: 'Не виконується'}
    ];

    public sub: Subscription;

    constructor(private formBuilder: FormBuilder, private leadsService: LeadsService, private clientsService: ClientsService) {

    }

    addLead() {
        this.leadObject.push(new Lead(this.lead.title, this.lead.description, this.lead.status, this.lead.client, this.lead.user_created, this.lead.contact_date));
        this.leadsService.createLead(this.leadObject[0]).subscribe(resLead => resLead);
    }
    ngOnInit() {
        this.sub = this.clientsService.getUsers()
            .subscribe(resUsers => {
                for (let i = 0; i < Object.keys(resUsers).length; i++) {
                    this.user = new Users(resUsers[i].id.toString(), resUsers[i].name);
                    this.users.push(this.user);
                }
            });
        this.leadsService.getClients()
            .subscribe( resClients => {
                for (let i = 0; i < Object.keys(resClients).length; i++) {
                    this.client = new Client(resClients[i].id.toString(), resClients[i].name);
                    this.clients.push(this.client);
                }
            });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
