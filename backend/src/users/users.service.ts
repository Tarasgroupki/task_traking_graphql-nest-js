import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './user.entity';
import {Role} from '../settings/role.entity';
import {UserHasRole} from './user_has_role.entity';
import {Repository} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private saltRounds = 10;

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
                @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
                @InjectRepository(UserHasRole)  private readonly userHasRoleRepository: Repository<UserHasRole>,
    ) {
       // super(repo);
    }

    async showByLead(userId: number) {
        return await this.userRepository.find({
            where: {id: userId},
            relations: ['leads'],
        });
    }

    async showByClient(clientId: number) {
        return await this.userRepository.find({
            where: {id: clientId},
        });
    }

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getRoles(userId): Promise<Role[]> {
        return await this.roleRepository.find({
            where: {id: userId},
        });
    }

    async getUserByUsername(email: string): Promise<User> {
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
        return await this.userRepository.find({id: id.id});
    }
   // async findOneByEmail(email):
    async findUserRoles(id): Promise<UserHasRole[]> {
        return await this.userHasRoleRepository.find({user_id: id});
    }
}
