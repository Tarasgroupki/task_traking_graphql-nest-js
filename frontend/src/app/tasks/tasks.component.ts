import {Component, OnInit, ViewChild} from '@angular/core';
import { TasksService } from './tasks.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
    title = 'app';
    tasks: any;
    displayedColumns = ['id', 'title', 'description', 'status', 'sprint_assigned', 'user_created', 'deadline'];
    dataSource: any;

    constructor(private tasksService: TasksService) {}

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    ngOnInit() {
        this.tasksService.getTasks().subscribe(resTasks => {
            this.tasks = resTasks;
            for (const i of Object.keys(this.tasks)) {
                if (this.tasks[i].status === 2) {
                    this.tasks[i].status = 'Виконано';
                } else if (this.tasks[i].status === 1) {
                    this.tasks[i].status = 'Виконується';
                } else {
                    this.tasks[i].status = 'Не виконується';
                }
            }
            this.dataSource = new MatTableDataSource(this.tasks);
            this.dataSource.paginator = this.paginator;
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
