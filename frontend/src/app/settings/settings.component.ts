import {Component, OnInit, ViewChild} from '@angular/core';
import { SettingsService } from './settings.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    title = 'app';
    roles: object;
    displayedColumns = ['id', 'name', '_v'];

    constructor(private _roles: SettingsService) {}

    ngOnInit() {
        this._roles.getRoles().subscribe(res => {
            this.roles = res;
            console.log(res);
        });
    }

}
