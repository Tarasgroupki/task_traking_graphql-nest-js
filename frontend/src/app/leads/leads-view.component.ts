import { Component, OnInit } from '@angular/core';
import { Lead } from "./leads.model";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';

import gql from 'graphql-tag';

import { Query } from "../types";
import {subscribe} from "graphql";
import {HttpHeaders} from "@angular/common/http";
import {LeadsService} from './leads.service';

@Component({
    selector: 'app-leads-view',
    templateUrl: './leads-view.component.html',
    styleUrls: ['./leads.component.css']
})
export class LeadsViewComponent {
    lead: Lead = new Lead('', '', 1, '', '', (new Date()));

    constructor(private route: ActivatedRoute, private _router: Router, private leadService: LeadsService) {
        this.route.params.subscribe(params => this.leadService.getOneLead(params['id']).subscribe(res => {this.lead = res[0];}));

    }

}
