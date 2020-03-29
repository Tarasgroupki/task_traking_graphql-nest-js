import { Component, OnInit, OnChanges, SimpleChange, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Lead } from './leads.model';
import { Users } from '../clients/users.model';
import { Subscription } from 'rxjs';
import { ClientsService } from '../clients/clients.service';
import { LeadsService } from './leads.service';
import { Client } from './client.model';
import { WebsocketService } from '../websocket.service';

@Component({
    selector: 'app-leads-update',
    templateUrl: './leads-update.component.html',
    styleUrls: ['./leads.component.css'],
})
export class LeadsUpdateComponent implements OnInit, OnDestroy {
    id: number;
    leadOb: any;
    date: any;
    lead: Lead = new Lead('Taras', 'taras2andry@mail.ru', 1, '1', '1', (new Date()));
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
    selectedValue: number;

    public sub: Subscription;

    constructor(private route: ActivatedRoute, private apollo: Apollo, private router: Router, private leadsService: LeadsService, private clientsService: ClientsService, private websocketService: WebsocketService) {

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
        this.route.params.subscribe(params => this.leadsService.getOneLead(params['id']).subscribe(resOneLead => {
        this.date = new Date(resOneLead[0].contact_date);
        this.lead = new Lead(resOneLead[0].title, resOneLead[0].description, resOneLead[0].status, resOneLead[0].client[0]['id'].toString(), resOneLead[0].user[0]['id'].toString(), this.date);
        console.log(typeof this.lead.contact_date);
        }));
    }

    updateLead() {
        this.leadObject.push(new Lead(this.lead.title, this.lead.description, this.lead.status, this.lead.client, this.lead.user, this.lead.contact_date));

        this.route.params.subscribe(params => this.leadsService.updateLead(+params['id'], this.leadObject[0]).subscribe(() => {}));
        /* this.clients.push(new Client(this.client.name, this.client.email, this.client.primary_number, this.client.secondary_number, this.client.address, this.client.zipcode, this.client.city, this.client.company_name, this.client.vat, this.client.company_type, this.client.user_id, this.client.industry_id));
        // console.log(this.clients[0]['name']);
        // this.selected = this.client.user_id;
         this._client_obj.updateClient(this.id, this.clients[0]).subscribe(res => {

         console.log(res);
     });*/


    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
