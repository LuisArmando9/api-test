import { Injectable } from '@nestjs/common';
import { UserLogRepository } from 'src/core/shared/repositories/user-log-repository';


@Injectable()
export class LogService {
    constructor(
        private readonly log_repository: UserLogRepository
    ) {
    }
    getByUserIdAndType(id: number, type: string){
        return this.log_repository.getByUserIdAndType(id, type)
    }
    

}
