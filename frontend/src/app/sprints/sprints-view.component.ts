import { Component, OnInit } from '@angular/core';
import { Sprint } from "./sprints.model";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';

import gql from 'graphql-tag';

import { Query } from "../types";
import {subscribe} from "graphql";
import {HttpHeaders} from "@angular/common/http";
import {SprintsService} from './sprints.service';

@Component({
    selector: 'app-sprints-view',
    templateUrl: './sprints-view.component.html',
    styleUrls: ['./sprints.component.css']
})
export class SprintsViewComponent {
    sprint: Sprint = new Sprint('', '', 1, '', '', '');

    constructor(private route: ActivatedRoute, private _router: Router, private sprintService: SprintsService) {
        this.route.params.subscribe(params => this.sprintService.getOneSprint(params['id']).subscribe(res => {this.sprint = res[0];}));

    }

}
