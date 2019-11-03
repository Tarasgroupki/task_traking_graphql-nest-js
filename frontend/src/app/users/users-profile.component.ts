import { Component, OnInit, OnChanges ,SimpleChange } from '@angular/core';
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
    role_list: string;

    constructor(public _user_obj: UsersService, private route: ActivatedRoute) {

    }
    ngOnInit() {
        console.log(this.LogginningData.user.id);
        console.log(localStorage.getItem('token'));
        console.log(this.user);
        for ( let i = 0; i < this.LogginningData['roles'].length; i++){
            this.roles[i] = this.LogginningData['roles'][i];
        }
        this.role_list = this.roles.join();
        console.log(this.roles);
        this._user_obj.getOneUser(this.LogginningData.user.id).subscribe(res => {
            //res = res[0];
            this.user = new User(res[0]['name'], res[0]['email'], res[0]['password'], res[0]['address'], res[0]['work_number'], res[0]['personal_number'], res[0]['image_path']);
            console.log(this.user);
        });
    }

    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0];
        console.log(this.selectedFile);
    }

    updateUser() {
        if (this.selectedFile != null) {
            const fd = new FormData();
            fd.append('image_path', this.selectedFile, this.selectedFile.name);
        //this._user_obj.fileUpload(fd).subscribe(res => {
         //   console.log(res);
       // });
        //this.filename = this.selectedFile.name;
        }
        this.users.push(new User(this.user.name, this.user.email, this.user.password, this.user.address, this.user.work_number, this.user.personal_number, this.filename));
        console.log(this.user);
        /*this._user_obj.updateProfileUser(this.LogginningData.user.id, this.users).subscribe(res => { (this.filename !== null) ? this.user.image_path = this.filename : null;
            this.users.length = 0;
        });*/
    }

}
