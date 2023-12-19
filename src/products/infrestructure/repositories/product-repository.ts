import { ProductEntity } from "../entities/product-entity";
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SearchProductDto } from "../dtos/search-product-dto";
import { isNotEmpty } from "src/core/shared/utlis/lodash-utils";
import { ProductDto } from "../dtos/product-dto";
import { NotFoundException } from '@nestjs/common';
import { BrandEntity } from "src/brand/infrestructure/entities/brand-entity";
import { ProductNotFoundException } from "src/products/domain/exceptions/product-exceptions";
import { paginate, paginateRaw } from "nestjs-typeorm-paginate";
import { IBaseRepository } from "src/core/shared/interfaces/base-repository-interface";


export class ProductRepository implements IBaseRepository<ProductEntity, SearchProductDto, ProductDto>  {
    private readonly brand: Repository<BrandEntity>
    constructor(
    @InjectRepository(ProductEntity) 
    private readonly product: Repository<ProductEntity>,
    private readonly dataSource: DataSource

    ){
        this.brand = dataSource.getRepository(BrandEntity);
    } 
      
    findById(id: number): Promise<ProductEntity> {
        return this.product.findOneBy({id});
    }

    async insert(dto: ProductDto) {
        const countBrand = await this.brand.count({where:{id:dto.brandId}});
        if (countBrand <= 0) throw new NotFoundException("Not found brand");
        const entity = this.product.create(dto);
        return this.product.save(entity);
    }

    async update(dto: ProductDto) {
        const exists = await this.existsById(dto.id);
        if (exists) {
            const productId = dto.id;
            delete dto.brandId;
            delete dto.id;
            delete dto.userId;
            await this.product.update(productId, dto);
            return dto;
        }
        throw new ProductNotFoundException()
    }

    findByDto(dto: SearchProductDto) {
        const qb = this.product.createQueryBuilder("p");
        if (isNotEmpty(dto?.code)) qb.andWhere("p.code = :code");
        if (isNotEmpty(dto?.name)) qb.andWhere("p.name = :name");
        if (isNotEmpty(dto?.created)) qb.andWhere("p.createdAt >= :created");
        if (isNotEmpty(dto?.updated)) qb.andWhere("p.updatedAt >= :updated");
        return paginate<ProductEntity>(qb, dto);
    }

    async existsById(id: number) {
        const count = await this.product.count({where:{id: Number(id)}});
        return count > 0;
    }

    softDelete(id: number) {
        return this.product.softDelete(id);
    }

}