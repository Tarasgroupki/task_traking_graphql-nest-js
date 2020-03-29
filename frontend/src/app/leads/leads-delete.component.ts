import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import {LeadsService} from './leads.service';

@Component({
    selector: 'app-leads-delete',
    templateUrl: './leads.component.html',
    styleUrls: ['./leads.component.css']
})
export class LeadsDeleteComponent {
    title = 'app';
    lead: object;

    constructor(private route: ActivatedRoute, private router: Router, private leadsService: LeadsService) {
        this.route.params.subscribe( params => this.leadsService.deleteLead(+params['id']).subscribe(() => {
            this.router.navigate(['leads']);
        }));
    }

}
