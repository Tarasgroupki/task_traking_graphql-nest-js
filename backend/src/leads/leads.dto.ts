import { Field, ObjectType} from 'type-graphql';
import {ClientsRO} from '../clients/clients.dto';

@ObjectType()
export class LeadsDto {
    @Field() readonly id: number;
    @Field() readonly title: string;
    @Field() readonly description: string;
    @Field() readonly status: number;
    @Field() readonly user_assigned: number;
    @Field() readonly client: number;
    @Field() readonly user_created: number;
    @Field() readonly contact_date: Date;
}

export class LeadsRO {
    id: number;
    title: string;
    description: string;
    status: string;
    user_assigned: number;
    client: ClientsRO;
    user_created: number;
    contact_date: Date;
}
