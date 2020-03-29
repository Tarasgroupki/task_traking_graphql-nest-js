import { Injectable } from '@angular/core';
import {Observable, Observer, Subject} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class WebsocketService {
  constructor( private socket: Socket ) {}

  private subject: Subject<MessageEvent>;
  notifications = new BehaviorSubject<any>(null);
  notificationsCounter = new BehaviorSubject<number>(null);


  sendHello() {
    this.socket.emit('hello', {name: 123});
  }

  sendMessage(text: string) {
    this.socket.emit('MsgToServer', {text});
  }

  createdNotification() {
    this.socket.emit('getNotificationsByUserAndStatus', {userId: 1}, (event) => {
      this.notificationsCounter.next(event.length + 1);
    });
  }

  getNotificationCounter(userId: number) {
    this.socket.emit('getNotificationsByUserAndStatus', {userId}, (event) => {
      console.log(event.length);
      this.notificationsCounter.next(event.length);
    });
  }

  getNotificationsByUser(userId: number) {
    return this.socket.emit('getNotificationsByUser', {userId}, (event) => {
      this.socket.emit('notificationHasLead', {userId}, (event1) => {
        for (let i = 0; i < event.length; i++) {
          event[i].lead_id = event1[i].id;
        }
        this.notifications.next(event);
        this.getNotificationCounter(userId);
      });
    });
  }

  updateNotificationStatus(userId: number) {
    this.socket.emit('updateNotificationStatus', userId);
  }

  deleteNotification(id: number) {
    this.socket.emit('deleteNotifications', {id});
  }

}
