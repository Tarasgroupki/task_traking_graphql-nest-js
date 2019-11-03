import {Component, OnInit, ViewChild} from '@angular/core';
import { UsersService } from './users.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    title = 'app';
    users: any;
    displayedColumns = ['id', 'name', 'email', 'work_number', 'personal_number'];
    dataSource: any;

    constructor(private _users: UsersService) {}

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    ngOnInit() {
        this._users.getUsers().subscribe(res => {
            this.users = res;

            this.dataSource = new MatTableDataSource(this.users);
            console.log(res);
            this.dataSource.paginator = this.paginator;
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
