import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchBrandDto } from "../dtos/search.brand.dto";
import { isNotEmpty } from "src/core/shared/utlis/lodash.utils";
import { BrandDto } from "../dtos/brand.dto";
import { NotFoundException } from '@nestjs/common';
import { BrandEntity } from '../entities/brand.entity';


export class BrandRepository {
    constructor(
    @InjectRepository(BrandEntity) 
    private readonly brand: Repository<BrandEntity>
    ){}

    insert(dto: BrandDto) {
        const entity = this.brand.create(dto);
        return this.brand.save(entity);
    }

    async update(dto: BrandDto) {
        const exists = await this.existsById(dto.id);
        if (exists) return this.brand.save(dto);
        throw new NotFoundException("Not found brand by id");
    }

    findByDto(dto: SearchBrandDto) {
        const qb = this.brand.createQueryBuilder("b");
        if (isNotEmpty(dto.name)) qb.andWhere("b.name = :name");
        if (isNotEmpty(dto.status)) qb.andWhere("b.status = :status");
        qb.setParameters(dto);
        return qb.getMany();
    }

    async existsById(id: number) {
        const count = await this.brand.count({where:{id: id}});
        return count > 0;
    }

    softDelete(id: number) {
        return this.brand.softDelete(id);
    }

}