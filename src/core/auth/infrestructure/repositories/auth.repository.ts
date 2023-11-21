
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UserEntity } from '../../infrestructure/entities/user.entity';
import { UserDto } from '../dto/user.dto';
import { AlreadyEmailExistsException } from '../../domain/exceptions/user.exceptions';



export class UserRepository {
    constructor(
    @InjectRepository(UserEntity) 
    private readonly user: Repository<UserEntity>
    ){}

    async insert(dto: UserDto) {
        const exists = await this.existsByEmail(dto.email);
        if (exists) throw new AlreadyEmailExistsException();
        const user = await this.user.save(this.user.create(dto));
        delete user.password;
        return user;
    }


    findByEmail(email: string) {
      return this.user.findOne({where:{email}})
    }

    async existsByEmail(email: string) {
        const count = await this.user.count({where:{email}});
        return count > 0;
    }

}