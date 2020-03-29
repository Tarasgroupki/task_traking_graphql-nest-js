import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LeadsService } from './leads.service';
import { interval, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Lead, Query } from '../types';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit, OnDestroy {
  leads: any;
  displayedColumns = ['select', 'id', 'title', 'description', 'status', 'client', 'user_assigned', 'contact_date'];
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // timer$ = interval(50);
  dataSource: MatTableDataSource<Lead>;
  selection = new SelectionModel<Lead>(true, []);
  visibleDel = false;

  public sub: Subscription;

  constructor(private leadsService: LeadsService) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.sub = this.leadsService.getLeads().subscribe(resLeads => {
      this.leads = resLeads;
      for (const i of Object.keys(this.leads)) {
        if (this.leads[i].status === 2) {
          this.leads[i].status = 'Виконано';
        } else if (this.leads[i].status === 1) {
          this.leads[i].status = 'Виконується';
        } else {
          this.leads[i].status = 'Не виконується';
        }
      }
      this.dataSource = new MatTableDataSource(this.leads);
      console.log(resLeads);
      this.dataSource.paginator = this.paginator;
      /*this.leadsService.subscribeLead().subscribe(resLead => {
        console.log(resLead);
      });*/
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isSelected() {
    const numSelected = this.selection.selected.length;
    if (numSelected > 0) {
      this.visibleDel = true;
      return this.visibleDel;
    } else {
      this.visibleDel = false;
      return this.visibleDel;
    }
  }

  isAllSelected() {
    if (!this.dataSource) {
      return false;
    }
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  DeleteSelected() {
    const numSelected = this.selection.selected;
    const idArr = [];
    if (numSelected) {
      numSelected.forEach((item) => {
        idArr.push(+item.id);
      });
      this.leadsService.deleteLeads(idArr);
    }
    return numSelected;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Lead): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
