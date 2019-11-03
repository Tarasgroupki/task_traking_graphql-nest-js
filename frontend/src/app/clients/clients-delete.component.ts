import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import { ActivatedRoute,RouterModule, Router } from "@angular/router";

import gql from 'graphql-tag';

import { Client, Query } from "../types";
import {HttpHeaders} from "@angular/common/http";
import {ClientsService} from './clients.service';

@Component({
  selector: 'app-clients-delete',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsDeleteComponent {
    title = 'app';
    client: object;

    constructor(private route: ActivatedRoute, private router: Router, private clientService: ClientsService) {
        this.route.params.subscribe( params => this.clientService.deleteClient(parseInt(params['id'])).subscribe(() => {
            this.router.navigate(['clients']);
        }));
    }

  /*  ngOnInit() {
        this._client.showClient().subscribe(res => {
            this.client = res;
          //  console.log(res);
        });*/
    /*ngOnInit() {
        this._clients.getClients().subscribe(res => {
            this.clients = res;
        });
    }*/

}
