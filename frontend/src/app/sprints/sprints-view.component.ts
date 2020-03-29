import { Component, OnInit } from '@angular/core';
import { Sprint } from './sprints.model';
import { Router, ActivatedRoute } from '@angular/router';
import {SprintsService} from './sprints.service';

@Component({
    selector: 'app-sprints-view',
    templateUrl: './sprints-view.component.html',
    styleUrls: ['./sprints.component.css']
})
export class SprintsViewComponent {
    sprint: Sprint = new Sprint('', '', 1, '', '', '');

    constructor(private route: ActivatedRoute, private router: Router, private sprintService: SprintsService) {
        this.route.params.subscribe(params => this.sprintService.getOneSprint(params['id']).subscribe(resOneSprint => { this.sprint = resOneSprint[0]; }));
    }

}
