
import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './user.entity';
import { UserHasRole } from './user_has_role.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private saltRounds = 10;

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
                @InjectRepository(UserHasRole)  private readonly userHasRoleRepository: Repository<UserHasRole>,
    ) {
       // super(repo);
    }

    async showByLead(userId: number) {
       // console.log(userId);
        const users = await this.userRepository.find({
            where: {id: userId},
            relations: ['leads']
        });
        return users.map(users => users);
    }

    async showByClient(clientId: number) {
        const users = await this.userRepository.find({
            where: {id: clientId},
            // relations: ['leads']
        });
        // console.log(clients);
        return users.map(users => users);
    }

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUserByUsername(email: string): Promise<User> {
        console.log((await this.userRepository.find({ email }))[0]);
        return (await this.userRepository.find({ email }))[0];
    }

    async createUser(user: User): Promise<User> {
        user.passwordHash = await this.getHash(user.password);

        // clear password as we don't persist passwords
        user.password = undefined;
        return this.userRepository.save(user);
    }

    async getHash(password: string|undefined): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async compareHash(password: string|undefined, hash: string|undefined): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }
    async findOne(id): Promise<User[]> {
        const user = await this.userRepository.find({id: id.id});
        console.log(user);
        return user;
    }
   // async findOneByEmail(email):
    async findUserRoles(id): Promise<UserHasRole[]> {
        return await this.userHasRoleRepository.find({user_id: id});
    }
   // async create(@Body() createCatDto: CreateCatDto) {
   //     this.catsService.create(createCatDto);
  //  }
}
