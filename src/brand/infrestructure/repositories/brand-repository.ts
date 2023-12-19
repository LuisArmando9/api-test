import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchBrandDto } from "../dtos/search-brand-dto";
import { isNotEmpty } from "src/core/shared/utlis/lodash-utils";
import { BrandDto } from "../dtos/brand-dto";
import { BrandEntity } from '../entities/brand-entity';
import { BrandNotFoundException } from 'src/brand/domain/services/exceptions/brand-exceptions';
import { IBaseRepository } from 'src/core/shared/interfaces/base-repository-interface';
import { paginate, paginateRaw, IPaginationMeta } from 'nestjs-typeorm-paginate';


export class BrandRepository implements IBaseRepository<BrandEntity, SearchBrandDto, BrandDto >  {
    constructor(
    @InjectRepository(BrandEntity) 
    private readonly brand: Repository<BrandEntity>
    ){}
    
    findById(id: number): Promise<BrandEntity> {
        return this.brand.findOneBy({id});
    }

    insert(dto: BrandDto) {
        const entity = this.brand.create(dto);
        return this.brand.save(entity);
    }

    async update(dto: BrandDto) {
        const exists = await this.existsById(dto.id);
        if (exists) {
            const brand_id = dto.id;
            delete dto.id;
            delete dto.user_id;
            await this.brand.update(brand_id, dto);
            return dto;
        }
        throw new BrandNotFoundException()
    }

    findByDto(dto: SearchBrandDto) {
        const qb = this.brand.createQueryBuilder("b");
        if (isNotEmpty(dto.name)) qb.andWhere("b.name = :name");
        if (isNotEmpty(dto.status)) qb.andWhere("b.status = :status");
        qb.setParameters(dto);
        return paginate<BrandEntity>(qb, dto);
    }

    async existsById(id: number) {
        const count = await this.brand.count({where:{id: Number(id)}});
        return count > 0;
    }

    softDelete(id: number) {
        return this.brand.softDelete(id);
    }

}