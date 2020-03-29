import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { UsersService } from './users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from './users.model';

@Component({
    selector: 'app-users-profile',
    templateUrl: './users-profile.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersProfileComponent implements OnInit {
    id: number;
    public LogginningData = JSON.parse(localStorage.getItem('LoggedIn'));
    user: User = new User('', '', '', '', '', '', '');
    users: User[] = [];
    selectedFile = null;
    filename = null;
    roles = [];
    roleList: string;

    constructor(public userObj: UsersService, private route: ActivatedRoute) {

    }
    ngOnInit() {
        for (let i = 0; i < this.LogginningData['roles'].length; i++) {
            this.roles[i] = this.LogginningData['roles'][i];
        }
        this.roleList = this.roles.join();
        console.log(this.roles);
        this.userObj.getOneUser(this.LogginningData.user.id).subscribe(resOneUser => {
            this.user = new User(resOneUser[0]['name'], resOneUser[0]['email'], resOneUser[0]['password'], resOneUser[0]['address'], resOneUser[0]['work_number'], resOneUser[0]['personal_number'], resOneUser[0]['image_path']);
            console.log(this.user);
        });
    }

    onFileSelected(event) {
        this.selectedFile = <File> event.target.files[0];
        console.log(this.selectedFile);
    }

    updateUser() {
        if (this.selectedFile != null) {
            const fd = new FormData();
            fd.append('image_path', this.selectedFile, this.selectedFile.name);
        }
        this.users.push(new User(this.user.name, this.user.email, this.user.password, this.user.address, this.user.work_number, this.user.personal_number, this.filename));
    }

}
