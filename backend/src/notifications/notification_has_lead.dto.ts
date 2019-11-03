import { Field, ObjectType} from 'type-graphql';
//import {ClientsRO} from '../clients/clients.dto';

@ObjectType()
export class NotificationHasLeadDto {
    @Field() readonly id: number;
    @Field() readonly notification: number;
    @Field() readonly lead: number;
}
