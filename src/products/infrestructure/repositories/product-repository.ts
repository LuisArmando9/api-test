import { ProductEntity } from '../entities/product-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SearchProductDto } from '../dtos/search-product-dto';
import { isNotEmpty } from 'src/core/shared/utlis/lodash-utils';
import { ProductDto } from '../dtos/product-dto';
import { AlreadyExistsCodeException, ProductNotFoundException } from 'src/products/domain/exceptions/product-exceptions';
import { paginate, paginateRaw } from 'nestjs-typeorm-paginate';
import { IBaseRepository } from 'src/core/shared/interfaces/base-repository-interface';
import { GetProductView } from 'src/core/shared/views/produc-views';
import { GetBrandView } from 'src/core/shared/views/branch-views';
import { BrandNotFoundException } from 'src/brand/domain/services/exceptions/brand-exceptions';
import { CloudinaryService } from 'nestjs-cloudinary';
import { response } from 'express';
import { FileService } from 'src/core/shared/services/file-service';
import { QueryBuilderParamHelper } from 'src/core/shared/helpers/builder-helper';

export class ProductRepository
  implements IBaseRepository<ProductEntity, SearchProductDto, ProductDto>
{
  /**
   * PRIVATE INJECT REPOSITORIES
   */
  //Product entity
  @InjectRepository(ProductEntity)
  private readonly product: Repository<ProductEntity>;
  //Product view
  @InjectRepository(GetProductView)
  private readonly productView: Repository<GetProductView>;
  //Brand view
  @InjectRepository(GetBrandView)
  private readonly brandView: Repository<GetBrandView>;
  /**
   * END INJECT PROPERTIES
   */
  findById(id: number) {
    return this.productView.findOneBy({ id });
  }

  async insert(dto: ProductDto) {
    const [total_brands, total_products] = await Promise.all([
      this.brandView.countBy({
        id: dto.brand_id,
      }),
      this.productView.countBy({ code: dto.code }),
    ]);

    if (!total_brands) throw new BrandNotFoundException();
    if (!total_products) throw new AlreadyExistsCodeException()
    const entity = this.product.create(dto);
    return this.product.save(entity);
  }

  async update(dto: ProductDto) {
    const product = await this.productView.findOneBy({ id: dto.id });
    if (product) {
      const productId = dto.id;
      delete dto.brand_id;
      delete dto.id;
      delete dto.user_id;
      await this.product.update(productId, dto);
      return product as any;
    }
    throw new ProductNotFoundException();
  }

  findByDto(dto: SearchProductDto) {
    const qb = this.productView.createQueryBuilder('p');
    return QueryBuilderParamHelper
    .buildWithPaginate<SearchProductDto, 
    GetProductView>(qb, dto, {
        page:dto.page,
        limit:dto.limit
    })
  }

  async existsById(id: number) {
    const count = await this.productView.count({ where: { id: Number(id) } });
    return count > 0;
  }

  softDelete(id: number) {
    return this.product.softDelete(id);
  }
}
