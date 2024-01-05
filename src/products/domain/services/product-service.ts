import { Injectable } from '@nestjs/common';
import { UserProductAction } from 'src/core/shared/enums/user-action-enum';
import { UserLogRepository } from 'src/core/shared/repositories/user-log-repository';
import { ProductDto } from 'src/products/infrestructure/dtos/product-dto';
import { ProductRepository } from 'src/products/infrestructure/repositories/product-repository';
import { SearchProductDto } from 'src/products/infrestructure/dtos/search-product-dto';
import {
  InvalidInfoException,
  ProductNotFoundException,
} from '../exceptions/product-exceptions';
import { BaseRepository } from 'src/core/shared/repositories/base-repositoy';
import { ProductEntity } from 'src/products/infrestructure/entities/product-entity';
import { FileService } from 'src/core/shared/services/file-service';
import { isEmpty } from 'class-validator';

@Injectable()
export class ProductService extends BaseRepository<
  ProductEntity,
  SearchProductDto,
  ProductDto
> {
  constructor(
    private product_repository: ProductRepository,
    private log_repository: UserLogRepository,
    private readonly file_service: FileService,
  ) {
    super(log_repository, product_repository as any, UserProductAction, {
      invalid_data: new InvalidInfoException(),
      not_found: new ProductNotFoundException(),
    });
  }
  private isEmpty(buffer: Express.Multer.File){
    return isEmpty(buffer)  || buffer?.size <= 0
  }
  async insert(dto: ProductDto) {
    dto.image = await this.file_service.upload(dto.buffer_file);
    return super.insert(dto);
  }

  async update(dto: ProductDto) {
    if (!this.isEmpty(dto.buffer_file)) {
        dto.image = await this.file_service.upload(dto.buffer_file);
    }
    return super.update(dto);
  }
}
