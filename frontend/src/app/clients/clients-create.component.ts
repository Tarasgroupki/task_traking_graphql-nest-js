import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Client } from './clients.model';
import { Users } from './users.model';
import { Subscription } from 'rxjs';
import { ClientsService } from './clients.service';

@Component({
  selector: 'app-clients-create',
  templateUrl: './clients-create.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsCreateComponent implements OnInit, OnDestroy {
    client: any = new Client('', '', '', '', '', '', '', '', '', '', '', 1);
    clientObj: Client[] = [];
    user: any = new Users('', '');
    users = [];

    public sub: Subscription;

    constructor(private formBuilder: FormBuilder, private clientService: ClientsService) {

    }

    addClient() {
        this.clientObj.push(new Client(this.client.name, this.client.email, this.client.primary_number, this.client.secondary_number, this.client.address, this.client.zipcode, this.client.city, this.client.company_name, this.client.vat, this.client.company_type, this.client.user_id, this.client.industry));
        this.clientService.createClient(this.clientObj[0]).subscribe(res => res);
    }
    ngOnInit() {
       this.sub = this.clientService.getUsers()
        .subscribe(resUsers => {
            for (let i = 0; i < Object.keys(resUsers).length; i++) {
                this.user = new Users(resUsers[i].id.toString(), resUsers[i].name);
                this.users.push(this.user);
            }
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
