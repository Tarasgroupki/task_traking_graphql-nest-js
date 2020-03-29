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

    constructor(private usersService: UsersService) {}

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    ngOnInit() {
        this.usersService.getUsers().subscribe(resUsers => {
            this.users = resUsers;

            this.dataSource = new MatTableDataSource(this.users);
            this.dataSource.paginator = this.paginator;
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
