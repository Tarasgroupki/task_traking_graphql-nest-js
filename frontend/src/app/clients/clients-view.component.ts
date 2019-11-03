import { Component, OnInit } from '@angular/core';
import { Client } from "./clients.model";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router,ActivatedRoute } from "@angular/router";

import gql from 'graphql-tag';

import { Query } from "../types";
import {subscribe} from "graphql";
import {HttpHeaders} from "@angular/common/http";
import {ClientsService} from './clients.service';

@Component({
  selector: 'app-clients-view',
  templateUrl: './clients-view.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsViewComponent {
    client: Client = new Client('', '', '', '', '', '', '', '', '', '', '', 1);

    constructor(private route: ActivatedRoute, private _router: Router, private clientService: ClientsService) {
        this.route.params.subscribe(params => this.clientService.getOneCLient(params['id']).subscribe(res => {this.client = res[0];}));

    }

}

