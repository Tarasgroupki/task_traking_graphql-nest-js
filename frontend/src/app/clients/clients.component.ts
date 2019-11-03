import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ClientsService } from './clients.service';
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {Subscription} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

import gql from 'graphql-tag';

import { Client, Query } from "../types";
import { HttpHeaders } from "@angular/common/http";
import {WebsocketService} from '../websocket.service';

export interface Client {
  id: number;
  name: string;
  email: string;
  primary_number: string;
  secondary_number: string;
  address: string;
  zipcode: string;
  user: any;
  industry: number;
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy {
  clients: any;
  displayedColumns = ['select', 'id', 'name', 'email', 'primary_number', 'secondary_number', 'address', 'zipcode', 'industry'];
  //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<Client>;
  selection = new SelectionModel<Client>(true, []);
  visibleDel = false;

  public sub: Subscription;

  constructor(
      private clientService: ClientsService,
      private socketService: WebsocketService) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {

  this.sub = this.clientService.getClients().subscribe(res => {
      this.clients = res;
      this.dataSource = new MatTableDataSource(res);
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
    // console.log(id_arr);
      this.clientService.deleteClients(id_arr);
    }
   // console.log(numSelected);
    return numSelected;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {

    this.socketService.sendHello();

    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Client): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
