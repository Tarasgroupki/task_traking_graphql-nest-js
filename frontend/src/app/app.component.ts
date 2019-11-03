import { Component, OnInit, Inject } from '@angular/core';
//import { ApiService } from './api.service';
//import {ClientsInterface} from './clients-interface';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {NotificationsService} from './notifications/notifications.service';
import {ChatService} from './chat.service';
import {WebsocketService} from './websocket.service';
import {BehaviorSubject} from 'rxjs';

export interface DialogData {
  notification: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [ApiService]
})
export class AppComponent implements OnInit {
  title = 'app';
  public LogginningData = JSON.parse(localStorage.getItem('LoggedIn'));
  route: string;
  notif_counter: number;
  notifications: any;
  notifHasLead: any;
  showFiller = false;
  parameter = false;

  constructor(public dialog: MatDialog, private _router: Router, private userService: AuthService, private notificationService: NotificationsService, private websocketService: WebsocketService, private chatService: ChatService) {
    console.log(this.LogginningData);
   // this.showFiller = false;
    _router.events.subscribe((url: any) => {
      if (url.url !== undefined) {
        this.route = url.url;
      }
      if (this.route === '/') {
        this._router.navigate(['clients']);
      }
    });
  }
  ngOnInit() {
    setInterval(() => this.getNotificationCounter(this.LogginningData ? +this.LogginningData.user.id : this.userService.currentUser.getValue().id), 30000);
    this.getNotificationCounter(this.LogginningData ? +this.LogginningData.user.id : this.userService.currentUser.getValue().id);
    /*this.notificationService.getNotificationsByUser(this.LogginningData ? parseInt(this.LogginningData.user.id) : this.userService.currentUser.getValue().id).subscribe(res => {
      console.log(res);
      if (res) {
        this.notif_counter = res.length;
      }
      else {
        this.notif_counter = 0;
      }
    });*/
    //this.websocketService.createdNotification();
  }

  getNotificationCounter(userId: number) {
    console.log(userId);
    return this.websocketService.getNotificationsByUser(userId);
  }

  openDialog() {
    this.websocketService.updateNotificationStatus(this.LogginningData ? +this.LogginningData.user.id : this.userService.currentUser.getValue().id);
    this.websocketService.getNotificationsByUser(this.LogginningData ? +this.LogginningData.user.id : this.userService.currentUser.getValue().id);

    this.dialog.open(DialogDataComponent, {
      data: {
        notification: ['true']
      },
    //  disableClose: true
    });
  }

  openPanel() {
    this.showFiller = true;
  }
  changePannel() {
    //console.log(param);
    if (this.showFiller === false) {
      this.showFiller = true;
    }
    else {
      this.showFiller = false;
    }
  }
  closePannel() {
    this.showFiller = false;
  }
  openByClick() {
    if (this.parameter === false) {
      this.parameter = true;
    }
    else {
      this.parameter = false;
    }
  }

  removeAuth() {
    this.changePannel();
    this.parameter = false;
    localStorage.removeItem('token');
    localStorage.removeItem('LoggedIn');
    this._router.navigate(['logout']);
  }
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: './dialog-data-example-dialog.html',
})
export class DialogDataComponent {
  public show = true;
  //show = new BehaviorSubject<boolean>(true);
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private notificationService: NotificationsService, private websocketService: WebsocketService) {}

  reload(notification: any, notifications: any) {
    // console.log('reloading...');
    for (let i = 0; i < notifications._value.length; i++) {
      if (notification.id === notifications._value[i].id) {
        notifications._value.splice(i, 1);
      }
    }
    this.show = false;
    // this.notificationService.show.next(false);
    setTimeout(() => this.show = true);
  }

  deleteNotifications(id: number) {
   // console.log('logic', userId);
    this.websocketService.deleteNotification(id);
    // this.notificationService.deleteNotification(id).subscribe(res => res);
  }
}
