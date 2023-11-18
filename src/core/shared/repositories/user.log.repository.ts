import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isNotEmpty } from "src/core/shared/utlis/lodash.utils";
import { UserLogEntity } from '../entities/action.user.log.entity';
import { IActionUserSave } from '../interfaces/action.user.save.interface';

export class UserLogRepository {
    constructor(
    @InjectRepository(UserLogEntity) 
    private readonly log: Repository<UserLogEntity>
    ){}

    insert(action: IActionUserSave) {
        return this.log.save(this.log.create(action));
    }
    

}