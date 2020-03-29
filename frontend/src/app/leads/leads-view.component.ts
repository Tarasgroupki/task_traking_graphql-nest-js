import { Component, OnInit } from '@angular/core';
import { Lead } from './leads.model';
import { Router, ActivatedRoute } from '@angular/router';
import { LeadsService } from './leads.service';

@Component({
    selector: 'app-leads-view',
    templateUrl: './leads-view.component.html',
    styleUrls: ['./leads.component.css']
})
export class LeadsViewComponent {
    lead: Lead = new Lead('', '', 1, '', '', (new Date()));

    constructor(private route: ActivatedRoute, private router: Router, private leadsService: LeadsService) {
        this.route.params.subscribe(params => this.leadsService.getOneLead(params['id']).subscribe(resOneLead => { this.lead = resOneLead[0]; }));
    }

}
