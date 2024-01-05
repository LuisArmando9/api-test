import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { isNotEmpty } from "src/core/shared/utlis/lodash-utils";
import { UserLogEntity } from '../entities/action-user-log.entity';
import { IActionUserSave } from '../interfaces/action-user-save.interface';
import { GetLogView } from '../views/log-views';
import { Injectable } from '@nestjs/common';
import { GetUserView } from '../views/user-views';
import { UserNotFoundException } from 'src/core/auth/domain/exceptions/user-exceptions';

export class UserLogRepository {
    @InjectRepository(UserLogEntity) 
    private readonly log: Repository<UserLogEntity>
    @InjectRepository(GetLogView) 
    private readonly logView: Repository<GetLogView>

    @InjectRepository(GetUserView) 
    private readonly user: Repository<GetUserView>
    

    insert(action: IActionUserSave) {
        return this.log.save(this.log.create(action));
    }
    getByUserId(user_id: number){
        return this.logView.findBy({user_id})
    }
    async getByUserIdAndType(id: number, type: string) {
        const count_user = await this.user.countBy({id})
        if (count_user <= 0) throw new UserNotFoundException()
        const where = { user_id: id}
        if (isNotEmpty(type)) {
            where["action"] = Like(`%${type}%`)
        }  
        console.log("ddddddddddddddddddddddddddddddddd")
        console.log(where)
        const r = await this.logView.findBy(where)
        console.log("ggggggggggggggggggggg")
        console.log(r)
        console.log("endllllllllllllllllll")
        return r
    }
    

}