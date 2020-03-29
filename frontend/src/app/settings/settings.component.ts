import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingsService } from './settings.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    title = 'app';
    roles: object;
    displayedColumns = ['id', 'name', '_v'];

    constructor(private rolesService: SettingsService) {}

    ngOnInit() {
        this.rolesService.getRoles().subscribe(resRoles => {
            this.roles = resRoles;
        });
    }

}
