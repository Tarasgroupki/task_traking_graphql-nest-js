import { Field, ObjectType} from 'type-graphql';

@ObjectType()
export class ClientsDto {
    @Field() readonly id: number;
    @Field() readonly name: string;
    @Field() readonly email: string;
    @Field() readonly primary_number: string;
    @Field() readonly secondary_number: string;
    @Field() readonly address: string;
    @Field() readonly zipcode: string;
    @Field() readonly city: string;
    @Field() readonly company_name: string;
    @Field() readonly vat: string;
    @Field() readonly company_type: string;
    @Field() readonly user: number;
}

export class ClientsRO {
    id: number;
    name: string;
    email: string;
    primary_number: string;
    secondary_number: string;
    address: string;
    zipcode: string;
    city: string;
    company_name: string;
    vat: string;
    company_type: string;
  //  user: LeadsRO
}
