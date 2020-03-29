import {Component, OnInit, ViewChild} from '@angular/core';
import { SprintsService } from './sprints.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.css']
})
export class SprintsComponent implements OnInit {
    title = 'app';
    sprints: any;
    displayedColumns = ['id', 'title', 'description', 'status', 'lead_assigned', 'user_created', 'deadline'];
    dataSource: any;

    constructor(private sprintsService: SprintsService) {}

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    ngOnInit() {
        this.sprintsService.getSprints().subscribe(resSprints => {
            this.sprints = resSprints;
            for (const i of Object.keys(this.sprints)) {
                if (this.sprints[i].status === 2) {
                    this.sprints[i].status = 'Виконано';
                } else if (this.sprints[i].status === 1) {
                    this.sprints[i].status = 'Виконується';
                } else {
                    this.sprints[i].status = 'Не виконується';
                }
            }
            this.dataSource = new MatTableDataSource(this.sprints);
            this.dataSource.paginator = this.paginator;
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

}
