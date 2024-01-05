import { Pagination, IPaginationMeta } from "nestjs-typeorm-paginate";
import { UpdateResult } from "typeorm";
export interface IBaseRepository<Entity, SearchDto, BaseDto> {
    insert(dto: BaseDto): Promise<Entity>;
    update<T extends BaseDto >(dto: T | any):  Promise<BaseDto | Entity >;
    findByDto(dto: SearchDto):  Promise<Pagination<Entity | any , IPaginationMeta>>;
    findById(id: number):  Promise<Entity | null | undefined | any>;
    existsById(id: number): Promise<boolean>;
    softDelete(id: number): Promise<void | UpdateResult>;

}