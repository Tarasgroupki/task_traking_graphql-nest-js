import { Component, OnInit, OnChanges, SimpleChange, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from './clients.model';
import { Users } from './users.model';
import { Subscription } from 'rxjs';
import { ClientsService } from './clients.service';

@Component({
  selector: 'app-clients-update',
  templateUrl: './clients-update.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsUpdateComponent implements OnInit, OnDestroy {
    id: number;
  //  clientOb: any;
    client: Client = new Client('Taras', 'taras2andry@mail.ru', '0507212852', '0507212852', 'Kalush', '77300', 'Kalush', 'IFNTUOG', '321', 'University', '', 1);
   // clients: Client[] = [];
    user: any = new Users('', '');
    users = [];
    selectedValue: number;

    public sub: Subscription;

    constructor(private route: ActivatedRoute, private router: Router, private clientService: ClientsService) {

    }
    ngOnInit() {
      this.sub = this.clientService.getUsers()
          .subscribe(resUsers => {
              for (let i = 0; i < Object.keys(resUsers).length; i++) {
                  this.user = new Users(resUsers[i].id.toString(), resUsers[i].name);
                  this.users.push(this.user);
              }
          });
      this.route.params.subscribe(params => this.clientService.getOneCLient(params['id']).subscribe(res => {
            this.client = res[0];
            this.client.user = res[0].user[0]['id'].toString();
      }));
    }

    updateClient() {
        // this.clients.push(new Client(this.client.name, this.client.email, this.client.primary_number, this.client.secondary_number, this.client.address, this.client.zipcode, this.client.city, this.client.company_name, this.client.vat, this.client.company_type, this.client.user, this.client.industry));
        this.route.params.subscribe(params => this.clientService.updateClient(+params['id'], this.client).subscribe(() => {}));
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
