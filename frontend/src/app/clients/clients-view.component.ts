import { Component, OnInit } from '@angular/core';
import { Client } from './clients.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientsService } from './clients.service';

@Component({
  selector: 'app-clients-view',
  templateUrl: './clients-view.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsViewComponent {
    client: Client = new Client('', '', '', '', '', '', '', '', '', '', '', 1);

    constructor(private route: ActivatedRoute, private router: Router, private clientService: ClientsService) {
        this.route.params.subscribe(params => this.clientService.getOneCLient(params['id']).subscribe(resOneClient => { this.client = resOneClient[0]; }));
    }

}

