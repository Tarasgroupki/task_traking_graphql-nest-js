import { Component, OnInit } from '@angular/core';
import { Apollo } from "apollo-angular";
import { ActivatedRoute,RouterModule, Router } from "@angular/router";

import gql from 'graphql-tag';

import { Client, Query } from "../types";
import {HttpHeaders} from "@angular/common/http";
import {LeadsService} from './leads.service';

@Component({
    selector: 'app-leads-delete',
    templateUrl: './leads.component.html',
    styleUrls: ['./leads.component.css']
})
export class LeadsDeleteComponent {
    title = 'app';
    lead: object;

    constructor(private route: ActivatedRoute, private router: Router, private leadService: LeadsService) {
        this.route.params.subscribe( params => this.leadService.deleteLead(parseInt(params['id'])).subscribe(() => {
            this.router.navigate(['leads']);
        }));
    }

}
