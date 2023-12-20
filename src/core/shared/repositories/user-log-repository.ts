import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isNotEmpty } from "src/core/shared/utlis/lodash-utils";
import { UserLogEntity } from '../entities/action-user-log.entity';
import { IActionUserSave } from '../interfaces/action-user-save.interface';
import { GetLogView } from '../views/log-views';
import { Injectable } from '@nestjs/common';

export class UserLogRepository {
    constructor(
    @InjectRepository(UserLogEntity) 
    private readonly log: Repository<UserLogEntity>,
    @InjectRepository(GetLogView) 
    private readonly logView: Repository<GetLogView>
    ){}

    insert(action: IActionUserSave) {
        return this.log.save(this.log.create(action));
    }
    getByUserId(user_id: number){
        return this.logView.findBy({user_id})
    }
    

}