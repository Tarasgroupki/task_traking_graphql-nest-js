import { Field, ObjectType} from 'type-graphql';

@ObjectType()
export class NotificationsDto {
    @Field() readonly id: number;
    @Field() readonly name: string;
    @Field() readonly description: string;
    @Field() readonly status: number;
    @Field() readonly user: number;
}
