import { Component, OnInit, OnChanges ,SimpleChange, OnDestroy } from '@angular/core';
//import { ClientsService } from './clients.service';
import { Apollo } from "apollo-angular";
import {ActivatedRoute, Router} from '@angular/router';
import { Lead } from './leads.model';
import { Users } from '../clients/users.model';
import {Query} from "../types";
import gql from "graphql-tag";
import {HttpHeaders} from "@angular/common/http";
import {Subscription} from 'rxjs';
import {ClientsService} from '../clients/clients.service';
import {LeadsService} from './leads.service';
import {Client} from './client.model';
import {WebsocketService} from '../websocket.service';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-leads-update',
    templateUrl: './leads-update.component.html',
    styleUrls: ['./leads.component.css']
})
export class LeadsUpdateComponent implements OnInit, OnDestroy {
    id: number;
    lead_ob: any;
    date: any;
    lead: Lead = new Lead('Taras', 'taras2andry@mail.ru', 1, '1', '1', (new Date()));
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
    selectedValue: number;

    public sub: Subscription;

    constructor(private route: ActivatedRoute, private apollo: Apollo, private _router: Router, private leadService: LeadsService, private clientService: ClientsService, private websocketService: WebsocketService) {

    }
    ngOnInit() {
       // setInterval(() => this.method(), 1000);

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
        console.log(this.clients);
        this.route.params.subscribe(params => this.leadService.getOneLead(params['id']).subscribe(res => {
        //console.log(res[0].client[0]['id']);
        //this.lead = res[0];
        this.date = new Date(res[0].contact_date);
            console.log(this.date);
        this.lead = new Lead(res[0].title, res[0].description, res[0].status, res[0].client[0]['id'].toString(), res[0].user[0]['id'].toString(), this.date);
       // this.lead.contact_date = new Date(this.lead.contact_date);
        console.log(typeof this.lead.contact_date);
      //  console.log(this.leadService.callLead());
       // this.lead.client = res[0].client[0]['id'].toString();
        // this.lead.user = res[0].user[0]['id'].toString();
            /*this.apollo.subscribe({
                query: gql`
                    subscription notificationAdded {notificationAdded{id, title}}
                `,
            }).subscribe((data) => {
                if (data) {
                    console.log('2134');
                }
                console.log('got data ', data);
            },(error) => {
                console.log('there was an error sending the query', error);
            });*/
        }));
    }

    updateLead() {
        // this.date = new Date(this.lead.contact_date).getTime();
        // console.log(typeof this.date);
        //console.log( this.lead.contact_date);
        //console.log( new Date(this.lead.contact_date));
        this.lead_object.push(new Lead(this.lead.title, this.lead.description, this.lead.status, this.lead.client, this.lead.user, this.lead.contact_date));

        // this.websocketService.createdNotification();

        this.route.params.subscribe(params => this.leadService.updateLead(+params['id'], this.lead_object[0]).subscribe(() => {
            //console.log(typeof );
           // this.leads.length = 0;
            // this.router.navigate(['clients']);
        }));
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
