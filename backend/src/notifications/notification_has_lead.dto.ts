import { Field, ObjectType} from 'type-graphql';

@ObjectType()
export class NotificationHasLeadDto {
    @Field() readonly id: number;
    @Field() readonly notification: number;
    @Field() readonly lead: number;
}
