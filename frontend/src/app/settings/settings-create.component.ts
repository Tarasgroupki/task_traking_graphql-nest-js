import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { Roles } from './settings.model';

@Component({
  selector: 'app-settings-create',
  templateUrl: './settings-create.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsCreateComponent implements OnInit {
    role: any = new Roles('');
    roles: Roles[] = [];
    selectedCheckbox = [];
    rolePerm = [];
    permissions: object;

    constructor(public settingsService: SettingsService) {

    }
    addRole() {
        this.roles.push(new Roles(this.role.name));
        this.settingsService.createRole(this.roles).subscribe(resRole => {
            console.log(resRole);
            this.settingsService.getRoleByName(this.role.name).subscribe(resRoleByName => {
               // for(let i = 0; i < this.selectedCheckbox.length; i++) {
                  for (const i of Object.keys(this.selectedCheckbox)) {
                    this.rolePerm.push([resRoleByName[0]['id'], this.selectedCheckbox[i]]);
                  }
            });
        });

    }
    ngOnInit() {
        this.settingsService.getPermissions().subscribe(resPermissions => {
            this.permissions = resPermissions;
            console.log(this.permissions);
        });
    }
    onCkeckboxSelected(value) {
        if (this.selectedCheckbox.indexOf( value ) !== -1) {
            this.selectedCheckbox.splice(this.selectedCheckbox.indexOf( value ), 1);
        } else {
            this.selectedCheckbox.push(value);
        }
        console.log(this.selectedCheckbox);
    }

}
