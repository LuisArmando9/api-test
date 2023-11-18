import { ProductEntity } from "../entities/product.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SearchProductDto } from "../dtos/search.product.dto";
import { isNotEmpty } from "src/core/shared/utlis/lodash.utils";
import { ProductDto } from "../dtos/product.dto";
import { NotFoundException } from '@nestjs/common';
import { BrandEntity } from "src/brand/infrestructure/entities/brand.entity";


export class ProductRepository {
    private readonly brand: Repository<BrandEntity>
    constructor(
    @InjectRepository(ProductEntity) 
    private readonly product: Repository<ProductEntity>,
    private readonly dataSource: DataSource

    ){
        this.brand = dataSource.getRepository(BrandEntity);
    }   

    async insert(dto: ProductDto) {
        const countBrand = await this.brand.count({where:{id:dto.brandid}});
        if (countBrand <= 0) throw new NotFoundException("Not found brand");
        const entity = this.product.create(dto);
        return this.product.save(entity);
    }

    async update(dto: ProductDto) {
        const exists = await this.existsById(dto.id);
        if (exists) return this.product.save(dto);
        throw new NotFoundException("Not found product by id");
    }

    findByDto(dto: SearchProductDto) {
        const qb = this.product.createQueryBuilder("p");
        if (isNotEmpty(dto?.code)) qb.andWhere("p.code = :code");
        if (isNotEmpty(dto?.name)) qb.andWhere("p.name = :name");
        if (isNotEmpty(dto?.created)) qb.andWhere("p.createdAt >= :created");
        if (isNotEmpty(dto?.updated)) qb.andWhere("p.updatedAt >= :updated");
        qb.setParameters(dto);
        return qb.getMany();
    }

    async existsById(id: number) {
        const count = await this.product.count({where:{id: id}});
        return count > 0;
    }

    softDelete(id: number) {
        return this.product.softDelete(id);
    }

}