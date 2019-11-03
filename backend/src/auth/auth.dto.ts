import { Field, ObjectType} from 'type-graphql';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class AuthDto {
    @IsNotEmpty()
    @Field() readonly email: string;

    @IsNotEmpty()
    @Field() readonly password: string;
}
