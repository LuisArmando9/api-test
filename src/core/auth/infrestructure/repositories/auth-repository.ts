
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UserEntity } from '../entities/user-entity';
import { UserDto } from '../dto/user-dto';
import { AlreadyEmailExistsException } from '../../domain/exceptions/user-exceptions';
import { GetUserView } from 'src/core/shared/views/user-views';



export class UserRepository {
    constructor(
    @InjectRepository(UserEntity) 
    private readonly user: Repository<UserEntity>,
    @InjectRepository(GetUserView) 
    private readonly userView: Repository<GetUserView>
    ){}

    async insert(dto: UserDto) {
        const exists = await this.existsByEmail(dto.email);
        if (exists) throw new AlreadyEmailExistsException();
        const user = await this.user.save(this.user.create(dto));
        delete user.password;
        return user;
    }


    findByEmail(email: string) {
      return this.userView.findOne({where:{email}})
    }

    async existsByEmail(email: string) {
        const count = await this.userView.count({where:{email}});
        return count > 0;
    }

}