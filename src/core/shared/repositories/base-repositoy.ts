import { ACTION_TYPE_LOG, LOG_ACTION, UserBrandAction } from "../enums/user-action-enum";
import { IActionUserSave } from "../interfaces/action-user-save.interface";
import { IBaseDto } from "../interfaces/base-dto-interface";
import { IBaseRepository } from "../interfaces/base-repository-interface";
import { IThrowExceptionBase } from "../interfaces/exception-base-interface";
import { UserLogRepository } from "./user-log-repository";

export class BaseRepository<Entity, SearchDto, BaseDto extends IBaseDto> {
    
    constructor(
        private _log_repository: UserLogRepository,
        private repository:  IBaseRepository<Entity, SearchDto, BaseDto>,
        private readonly log_type_action: ACTION_TYPE_LOG,
        private readonly exceptions: IThrowExceptionBase
    ){

    }

    /**
     * 
     * @param userId 
     * @param action 
     */
    async saveLog(action: IActionUserSave) {
        await this._log_repository.insert(action)
    }

    /**
     * @param dto 
     * @returns 
     */
    async insert(dto: BaseDto) {
        const entity = await this.repository.insert(dto);
        if (entity) {
            await this.saveLog({
                user_id:dto.user_id,
                action:this.log_type_action.INSERT,
                after_data:dto
            })
            return entity;
        }
        throw this.exceptions.invalid_data;
    }

    /**
     * 
     * @param dto 
     * @returns 
     */
    async update(dto: BaseDto) {
        const entity = await this.repository.update(dto);
        if (entity) {
            await this.saveLog({
                user_id: dto.user_id,
                before_data:entity,
                after_data:dto,
                action: this.log_type_action.UPDATE
            })
            return dto;
        }
    }

    /**
     * 
     * @param id 
     * @param userId 
     */
    async softDelete(id: number, user_id: number){
        const exists = await this.repository.existsById(id);
        if (!exists) {
            throw  this.exceptions.not_found;
        }
        await Promise.all([
            this.saveLog({
                user_id,
                action:this.log_type_action.DELETE,
                after_data:{id}
            }),
            this.repository.softDelete(id)
        ]);
        
    }

    /**
     * @param dto 
     * @param userId 
     * @returns 
     */
    async getByDto(dto: SearchDto, user_id: number) {
        await this.saveLog({
            user_id,
            action:this.log_type_action.GET_BY_DTO,
            after_data:dto
        });
        return this.repository.findByDto(dto);
    }
    
    /**
     * 
     * @param id 
     * @returns 
     */
    async getById( id: number) {
        const  entity = await this.repository.findById(id);
        if (!entity) throw this.exceptions.not_found;
        return entity;
    }

}