import { Injectable } from '@nestjs/common';
import { UserProductAction } from 'src/core/shared/enums/user-action-enum';
import { UserLogRepository } from 'src/core/shared/repositories/user-log-repository';
import { ProductDto } from 'src/products/infrestructure/dtos/product-dto';
import { ProductRepository } from 'src/products/infrestructure/repositories/product-repository';
import { SearchProductDto } from 'src/products/infrestructure/dtos/search-product-dto';
import { InvalidInfoException, ProductNotFoundException } from '../exceptions/product-exceptions';
import { BaseRepository } from 'src/core/shared/repositories/base-repositoy';
import { ProductEntity } from 'src/products/infrestructure/entities/product-entity';


@Injectable()
export class ProductService extends BaseRepository<ProductEntity, SearchProductDto, ProductDto > {
    constructor(
        private productRepository: ProductRepository,
        private logRepository: UserLogRepository
    ) { 
        super(logRepository, productRepository, UserProductAction, {
            invalidData: new InvalidInfoException(),
            notFound: new ProductNotFoundException()
        });

    }
}
