import { UpdateResult } from "typeorm";

export interface IBaseRepository<Entity, SearchDto, BaseDto> {
    insert(dto: BaseDto): Promise<Entity>;
    update(dto: BaseDto):  Promise<BaseDto>;
    findByDto(dto: SearchDto):  Promise<Entity[]>;
    existsById(id: number): Promise<boolean>;
    softDelete(id: number): Promise<void | UpdateResult>;

}