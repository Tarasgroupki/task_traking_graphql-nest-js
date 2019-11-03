import {SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, OnGatewayConnection, OnGatewayDisconnect} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import {NotificationsService} from './notifications/notifications.service';
import {not} from 'rxjs/internal-compatibility';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger: Logger = new Logger('AppGateway');

  constructor(private readonly notificationsService: NotificationsService) {}

  afterInit(server: any) {
    this.logger.log('Initialized!');
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected: ${client.id}');
  }

  handleConnection(client: Socket, ...args): any {
    this.logger.log('Client connected: ${client.id}');
  }

  @SubscribeMessage('MsgToServer')
  handleMessage(client: Socket, text: string) {
    console.log({event: 'msgToClient', text});
  }

  @SubscribeMessage('hello')
  handleMessage1(client: Socket, data: any) {
    console.log( { event: 'hello', data} );
  }

  @SubscribeMessage('notificationHasLead')
 async notificationHasLead(client: Socket, id: number) {
    const notification = await this.notificationsService.findAllByUser(id);
    let ids = [];
    for (let i = 0; i < notification.length; i++) {
      ids.push(notification[i].id);
    }
    const lead = await this.notificationsService.findNotificationHasLead(ids);
    ids.length = 0;
    for (let i = 0; i < lead.length; i++) {
      ids.push({id: lead[i].lead_id});
    }
    return ids;
  }

  @SubscribeMessage('getNotificationsByUser')
   async getNotificationsByUser(client: Socket, userId: number) {
     // console.log(await this.notificationsService.findAllByUser(userId));
    return await this.notificationsService.findAllByUser(userId);
  }

    @SubscribeMessage('getNotificationsByUserAndStatus')
    async getNotificationsByUserAndStatus(client: Socket, userId: number) {
        return await this.notificationsService.findAllByUserAndStatus(userId);
    }

    @SubscribeMessage('updateNotificationStatus')
    async updateNotificationStatus(client: Socket, userId: number) {
        return await this.notificationsService.UpdateStatus(userId);
    }

  @SubscribeMessage('createNotification')
  async createNotification(client: Socket, data: any) {
    return await this.notificationsService.createNotification(data);
  }

  @SubscribeMessage('deleteNotifications')
   async deleteNotifications(client: Socket, id: number) {
    console.log(id);
    return await this.notificationsService.delete(id);
  }

}
