import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { Roles } from './settings.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-settings-update',
    templateUrl: './settings-update.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsUpdateComponent implements OnInit {
    id: number;
    role: any = new Roles('');
    roles: Roles[] = [];
    permissions: object;
    checkedPermissions: object;
    selectedCheckbox = [];
    unselectedCheckbox = [];
    rolePerm = [];

    constructor(public settingsService: SettingsService, private route: ActivatedRoute) {

    }
    updateRole() {
        this.settingsService.getRoleByName(this.role.name).subscribe(res => {
            this.roles.push(this.role.name);
            this.rolePerm.push(this.selectedCheckbox, this.unselectedCheckbox, this.roles);
        });
    }
    ngOnInit() {
        this.route.params.subscribe( params => this.settingsService.getOneRole(params['id']).subscribe(resOneRole => {
            this.role = new Roles(resOneRole[0]['name']);
            this.id = params['id'];
        }));
        this.settingsService.getPermissions().subscribe( resPermissions => {
            this.permissions = resPermissions;
            console.log(this.permissions);
        });
        this.route.params.subscribe( params => this.settingsService.getOneRoleHasPermission(params['id']).subscribe( resOneRoleHasPermission => {
                this.id = params['id'];
                this.checkedPermissions = resOneRoleHasPermission;
                console.log('Selected', this.checkedPermissions);
        }));
    }
    onCkeckboxSelected(value) {
        if (this.selectedCheckbox.indexOf( value ) !== -1) {
            this.selectedCheckbox.splice(this.selectedCheckbox.indexOf( value ), 1);
        } else {
            this.selectedCheckbox.push(value);
        }
        console.log(this.selectedCheckbox);
    }
    onCkeckboxUnSelected(value) {
        if (this.unselectedCheckbox.indexOf( value ) !== -1) {
            this.unselectedCheckbox.splice(this.unselectedCheckbox.indexOf( value ), 1);
        } else {
            this.unselectedCheckbox.push(value);
        }
        console.log(this.unselectedCheckbox);
    }

}
