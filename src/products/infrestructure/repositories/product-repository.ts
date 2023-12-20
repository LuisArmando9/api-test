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
import { GetProductView } from "src/core/shared/views/produc-views";


export class ProductRepository implements IBaseRepository<ProductEntity, SearchProductDto, ProductDto>  {
    private readonly brand: Repository<BrandEntity>
    constructor(
    @InjectRepository(ProductEntity) 
    private readonly product: Repository<ProductEntity>,
    @InjectRepository(GetProductView) 
    private readonly productView: Repository<GetProductView>,
    private readonly dataSource: DataSource

    ){
        this.brand = dataSource.getRepository(BrandEntity);
    } 
      
    findById(id: number) {
        return this.productView.findOneBy({id});
    }

    async insert(dto: ProductDto) {
        const countBrand = await this.brand.count({where:{id:dto.brand_id}});
        if (countBrand <= 0) throw new NotFoundException("Not found brand");
        const entity = this.product.create(dto);
        return this.product.save(entity);
    }

    async update(dto: ProductDto) {
        const product = await this.productView.findOneBy({id:dto.id});
        if (product) {
            const productId = dto.id;
            delete dto.brand_id;
            delete dto.id;
            delete dto.user_id;
            await this.product.update(productId, dto);
            return product as any;
        }
        throw new ProductNotFoundException()
    }

    findByDto(dto: SearchProductDto) {
        const qb = this.productView.createQueryBuilder("p");
        if (isNotEmpty(dto?.code)) qb.andWhere("p.code = :code");
        if (isNotEmpty(dto?.name)) qb.andWhere("p.name = :name");
        if (isNotEmpty(dto?.start_created)) qb.andWhere("p.createdAt >= :start_created");
        if (isNotEmpty(dto?.end_created)) qb.andWhere("p.createdAt <= :end_created");
        if (isNotEmpty(dto?.start_updated)) qb.andWhere("p.updatedAt >= :start_updated");
        if (isNotEmpty(dto?.end_updated)) qb.andWhere("p.updatedAt >= :end_updated");
        qb.setParameters(dto)
        return paginate<GetProductView>(qb, dto);
    }

    async existsById(id: number) {
        const count = await this.productView.count({where:{id: Number(id)}});
        return count > 0;
    }

    softDelete(id: number) {
        return this.product.softDelete(id);
    }

}