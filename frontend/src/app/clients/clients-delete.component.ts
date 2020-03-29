import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
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
        this.route.params.subscribe( params => this.clientService.deleteClient(+params['id']).subscribe(() => {
            this.router.navigate(['clients']);
        }));
    }

}
