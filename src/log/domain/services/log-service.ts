import { Injectable } from '@nestjs/common';
import { UserLogRepository } from 'src/core/shared/repositories/user-log-repository';


@Injectable()
export class LogService {
    constructor(
        private readonly log_repository: UserLogRepository
    ) {
    }
    getByUserId(id: number){
        return this.log_repository.getByUserId(id)
    }
    

}
