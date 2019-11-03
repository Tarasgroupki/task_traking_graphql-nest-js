import { Field, InputType } from 'type-graphql';

@InputType()
export class InputLead {
    @Field() readonly id: number;
    @Field() readonly title: string;
    @Field() readonly description: string;
    @Field() readonly status: number;
    @Field() readonly user_assigned: number;
    @Field() readonly client: number;
    @Field() readonly user_created: number;
    @Field() readonly contact_date: Date;
}
