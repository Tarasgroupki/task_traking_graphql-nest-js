import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class NotificationHasClientDto {
    @Field() readonly id: number;
    @Field() readonly notification: number;
    @Field() readonly client: number;
}
