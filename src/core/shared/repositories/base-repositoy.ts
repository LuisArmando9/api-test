import { ACTION_TYPE_LOG, LOG_ACTION, UserBrandAction } from "../enums/user-action-enum";
import { IBaseDto } from "../interfaces/base-dto-interface";
import { IBaseRepository } from "../interfaces/base-repository-interface";
import { IThrowExceptionBase } from "../interfaces/exception-base-interface";
import { UserLogRepository } from "./user-log-repository";

export class BaseRepository<Entity, SearchDto, BaseDto extends IBaseDto> {
    
    constructor(
        private _logRepository: UserLogRepository,
        private repository:  IBaseRepository<Entity, SearchDto, BaseDto>,
        private readonly logTypeAction: ACTION_TYPE_LOG,
        private readonly exceptions: IThrowExceptionBase
    ){

    }

    /**
     * 
     * @param userId 
     * @param action 
     */
    async saveLog(userId: number, action: LOG_ACTION) {
        await this._logRepository.insert({
            userId,
            action,
        })
    }

    /**
     * @param dto 
     * @returns 
     */
    async insert(dto: BaseDto) {
        const entity = await this.repository.insert(dto);
        if (entity) {
            await this.saveLog(dto.userId, this.logTypeAction.INSERT)
            return entity;
        }
        throw this.exceptions.invalidData;
    }

    /**
     * 
     * @param dto 
     * @returns 
     */
    async update(dto: BaseDto) {
        const entity = await this.repository.update(dto);
        if (entity) {
            await this.saveLog(dto.userId, this.logTypeAction.UPDATE)
            return entity;
        }
    }

    /**
     * 
     * @param id 
     * @param userId 
     */
    async softDelete(id: number, userId: number){
        const exists = await this.repository.existsById(id);
        if (!exists) {
            throw  this.exceptions.notFound;
        }
        await Promise.all([
            this.saveLog(userId, this.logTypeAction.DELETE),
            this.repository.softDelete(id)
        ]);
        
    }

    /**
     * @param dto 
     * @param userId 
     * @returns 
     */
    async getByDto(dto: SearchDto, userId: number) {
        await this.saveLog(userId, this.logTypeAction.GET_BY_DTO);
        return this.repository.findByDto(dto);
    }
    
    /**
     * 
     * @param id 
     * @returns 
     */
    async getById( id: number ) {
        const  entity = await this.repository.findById(id);
        if (!entity) throw this.exceptions.notFound;
        return entity;
    }

}