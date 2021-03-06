import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

/**
 * @title Injecting data when opening a dialog
 */
@Component({
  selector: 'app-notifications',
  templateUrl: '../dialog-data-example.html',
  styleUrls: ['../dialog-data-example.css'],
})
export class NotificationsComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogDataExampleDialogComponent, {
      data: {
        animal: 'panda'
      }
    });
  }
}

@Component({
  selector: 'app-dialog-data-example-dialog',
  templateUrl: '../dialog-data-example-dialog.html',
})
export class DialogDataExampleDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
