import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LeadsService } from './leads.service';
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {Subscription} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import gql from 'graphql-tag';

import {Lead, Query} from '../types';
import { HttpHeaders } from "@angular/common/http";
import {SelectionModel} from '@angular/cdk/collections';
import {Client} from '../clients/clients.component';


@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit, OnDestroy {
  leads: any;
  displayedColumns = ['select', 'id', 'title', 'description', 'status', 'client', 'user_assigned', 'contact_date'];
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<Lead>;
  selection = new SelectionModel<Lead>(true, []);
  visibleDel = false;

  public sub: Subscription;

  constructor(private leadService: LeadsService) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {

    this.sub = this.leadService.getLeads().subscribe(res => {
      this.leads = res;
      for(let i in this.leads) {
        if (this.leads[i].status == 2) {
          this.leads[i].status = 'Виконано';
        } else if (this.leads[i].status == 1) {
          this.leads[i].status = 'Виконується';
        } else {
          this.leads[i].status = 'Не виконується';
        }
      }
      this.dataSource = new MatTableDataSource(this.leads);
      console.log(res);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isSelected() {
    const numSelected = this.selection.selected.length;
    // console.log(numSelected);
    if (numSelected > 0) {
      this.visibleDel = true;
      return this.visibleDel;
    }
    else {
      this.visibleDel = false;
      return this.visibleDel;
    }
  }

  isAllSelected() {

    if(!this.dataSource) {
      return false;
    }
    // const data = this.dataSource.data as any;
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  DeleteSelected() {
    const numSelected = this.selection.selected;
    let id_arr = [];
    // const item_user = item.user as any;
    if (numSelected) {
      numSelected.forEach((item) => {
        id_arr.push(+item.id);
        // item.user = parseInt(item.user[0].id);
      });
       console.log(id_arr);
      this.leadService.deleteLeads(id_arr);
    }
    // console.log(numSelected);
    return numSelected;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {

    //this.socketService.sendHello();

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
