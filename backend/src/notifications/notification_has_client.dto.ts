import { Field, ObjectType} from 'type-graphql';
//import {ClientsRO} from '../clients/clients.dto';

@ObjectType()
export class NotificationHasClientDto {
    @Field() readonly id: number;
    @Field() readonly notification: number;
    @Field() readonly client: number;
}
