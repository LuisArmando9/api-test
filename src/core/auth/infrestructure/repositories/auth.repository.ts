
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UserEntity } from '../../infrestructure/entities/user.entity';
import { UserDto } from '../dto/user.dto';



export class UserRepository {
    constructor(
    @InjectRepository(UserEntity) 
    private readonly user: Repository<UserEntity>
    ){}

    async insert(dto: UserDto) {
        const exists = await this.existsByEmail(dto.email);
        if (exists) throw new BadRequestException("Already exists email");
        return await this.user.save(this.user.create(dto));
    }


    findByEmail(email: string) {
      return this.user.findOne({where:{email}})
    }

    async existsByEmail(email: string) {
        const count = await this.user.count({where:{email}});
        return count > 0;
    }

}